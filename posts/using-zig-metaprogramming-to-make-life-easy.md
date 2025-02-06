---
title: Using Zig Metaprogramming to Make Life Easy
tagline: Because life can be easy
date: 2025-02-05T19:00:00.000-06:00
draft: false
---

I have recently been getting a lot deeper into language design and compiler
architecture, and in my conquest to find the right language to build my next
language, I've started learning Zig. I've been watching a few conference talks
from Andrew Kelley and his approach to language design really resonates with me
but the biggest feature that has stood out to me from Zig is its
metaprogramming.

Zig's metaprogramming sticks out because it is quite restricted, in fact. You
can't allocate memory, you can't interact with raw token streams or generate
code for the compiler, and it imposes branch quotas for code that is run at
comptime. However, despite these limitations, it is extraordinarily powerful for
generating data and types at comptime. I just finished building a lexer generator
entirely in Zig comptime and I want to take you along the journey of building
it.

## A little bit background

Zig's metaprogramming is unique in what you can use it to do. For example, Rust
has a form of metaprogramming. You can write a procedural macro crate, which the
compiler will invoke with a stream of tokens, to which you can respond with a
stream of tokens. This is convenient in that it makes generating code super
easy. However, it is super inconvenient because you now have to split your
implementation across multiple crates and multiple contexts.

Zig is a little bit different, because functions that are run at comptime
(compile time) are located directly alongside the rest of your code. Instead of
working directly with tokens, comptime works with semantic values. For example,
you may build a type based on some static data (foreshadowing for later).

The standard library dynamic array in Zig is implemented entirely in userland
(user written code, outside of the compiler) utilizing metaprogramming. It is
just a function that returns a struct type. In the parameters of the function,
it takes another type as the type to use for items. From there, it constructs an
opaque type that implements a dynamic array. Here is a small example of how
someone else may implement a dynamic array in Zig:

```zig
fn ArrayList(comptime Item: type) type {
  return struct {
    const Self = @This();

    allocator: std.mem.Allocator,
    items: []Item,

    /// Initialize a dynamic array that is empty
    pub fn init(allocator: std.mem.Allocator) Self {
      return .{
        .allocator = allocator,
        .items = &Item{};
      };
    }

    /// Ensure that the length of `self.items` is at least `size`
    fn ensureCapacity(self: *Self, size: usize) !void {
      // ...
    }

    /// Insert `item` into the dynamic array, allocating if needed
    fn append(self: *Self, item: Item) !void {
      const idx = self.items.len;
      try self.ensureCapacity(self.items.len);
      self.items[idx] = item;
    }
  };
}
```

There are a few things to note here. The first is that this is just a regular
function. It takes some parameters, returns a value, and can be called like any
other function. Its parameter is a type. This could be any struct, enum, union,
etc. The function also returns a type. Same deal with this one, but in our case
we know it always returns a struct.

Zig's type system is lazily evaluated. Types aren't resolved until they are
referenced by code. So that means that the append function in that example could
have type errors in it, but they wouldn't be shown to the user unless the append
function was actually called.

This is actually a phenomenal design because it means that we can compute
structures at compile time while still the having full type safety that the
language provides. The compiler would throw an error if you try to call a
function that doesn't exist on that structure returned by the `ArrayList`
function.

Lazy type evaluation is nice because it also means that types can be referred to
with variables. So I could make a variable equal to `ArrayList(u8)` and use that
variable as a shorthand for that dynamic array of bytes. In the example above,
the `Item` parameter will effectively be a type alias for whatever type is
passed in as that argument.

## The problem we're trying to solve

I want to be able to rapidly iterate and build languages, as I explore language
design and compiler architecture. The first stage of any language is breaking
the source code up into larger blocks that the parser can form into hierarchical
structures representing the code for the compiler to convert into machine code
and so on and so forth.

I've built up some pretty simple backtracking and recursive descent lexers, so I
know what I'm doing I just don't want to have to do it each time. At the end of
the day, I just care about the token variant and the pattern of the token. In my
perfect world (we live in that world), I would be able to define a lexer like
this:

```zig
const MyLexer = Lexer(.{
  .Comment = .{ .pattern = "//([^\n])*" },
  .Division = .{ .pattern = "/" },
  .Func = .{ .pattern = "func" },
  .String = .{ .pattern = "\"([^\"]|\\\\\")*\"" },
  .Newline = .{ .pattern = "(\n|\r\n)", .skip = true },
  .Ident = .{ .pattern = "\\w\\W*" },
  //...
});

const lexer = MyLexer.init(allocator);
const tokens = try lexer.lex(input);
```

I can tell it what to name each token variant, give it a pattern to match that
variant by, and other miscellaneous settings relating to the token such as
whether or not to skip it. In fact, even more ideally the token enum that
represents each type of token it could be shouldn't even include those skipped
token variants (we're going to make even more ideally). I can quickly and
easily add new tokens or change existing ones. I don't need to know any
implementation details, just what I want it to give me out the back end.

## Making sense of the data

So, we know we want to write a function that takes in some data and returns a
struct that can be used to lex input. As you could imagine, the first step is
going to be just understanding the input data. We want to take in a struct with
fields, whose name is going to be the name of the token, and whose value is
going to contain information about that token.

Zig offers us a special type to take in unknown shaped data as input. This is
the `anytype` type. This resolves to allowing a value with an unknown type. So
far, our function looks like this:

```zig
fn Lexer(comptime tokens: anytype) type {
  return struct {
    // ...
  };
}
```

Now we need to convert that `tokens` variable into data that is easier for us to
use. It would be way easier to have just an array of token patterns, which are
just structs with a couple fields containing the data.

```zig
const TokenPattern = struct {
  name: []const u8,
  pattern: []const u8,
  skip: bool = false,
};

fn tokenPatternsFromTokens(comptime tokens: anytype) [@typeInfo(@TypeOf(tokens)).Struct.fields.len]TokenPattern {
  // grab the fields of `tokens` and create an array with the same number
  const fields = @typeInfo(@TypeOf(tokens)).Struct.fields;
  var token_patterns: [fields.len]TokenPattern = undefined;

  // iterate through the fields to construct a token pattern
  for (fields, 0..) |field, i| {
    // initialize the current pattern with just the name set to the name of the
    // field
    var pattern: TokenPattern = .{ .name = undefined, .pattern = undefined };
    pattern.name = field.name;

    // grab out the settings struct
    const settings = @field(tokens, field.name);

    // iterate over the fields of the settings
    for (@typeInfo(@TypeOf(settings)).Struct.fields) |setting| {
      // set the field of the pattern equal to the same naming field of the
      // settings
      @field(pattern, setting.name) = @field(settings, setting.name);
    }

    // insert the current pattern into the array of patterns
    token_patterns[i] = pattern;
  }

  // return the patterns
  return token_patterns;
}
```

Here is our function that is going to take that `tokens` and convert it into our
array of token patterns. I know it's a lot, so let's take it piece by piece. We
have a function that takes in an argument of any type. We'll get to that weird
syntax in a second, but for now I'll just say it returns an array of token
patterns with a length equal to the number of fields in the input struct.

First off, we want to get those fields. To do this, we first need to get the
type of the struct. We do this with the builtin function `@TypeOf`. That's a
function that takes in an `anytype` and returns a `type`. We can then use the
`typeInfo` builtin function to convert that type into a
[`std.builtin.Type`](https://ziglang.org/documentation/master/std/#std.builtin.Type).
This is our first little _real_ metaprogramming nugget, where we can inspect the
type of any value. We just grab the fields out of that type and throw it into
the `fields` variable.

Now that we have a field, we can initialize an array whose length is the same as
the number of fields. Notice that we can create an array whose length is based
on one of the arguments. This wouldn't be possible in runtime code, since the
compiler would need to know how much space on the stack to allocate at compile
time. Since our code is running at compile time, we can do this.

Next up is just iterating through those fields and filling out that array to
return. We create the token and fill out its name with the name of the field.
Next up is grabbing the token settings from that struct. We need to use the
`@field` builtin function to do this, since we only have a string value
representing the field name instead of the actual field value.

Next up is doing roughly the same thing of iterating over the fields in the
struct, but this time it's the fields representing the individual token's
settings. On each field, we set the same naming field of the token we are
constructing equal to the value of that field. So each token is specified with a
pattern. That pattern value is copied from the input into the token. The same
thing happens to additional fields, so if I specify `skip` as well, it is
automatically filled for that token.

Last up is to insert that token we just constructed into the array of token
patterns, to then be returned. At the end of this, we get a destructured set of
tokens to generate a lexer for.

## Parsing the lexer

This is an instance where regular expressions kinda work really well. Now I'm of
course not talking about full regular expressions. That would be overkill. I'm
talking about the idea of regular expressions. I can specify a pattern of
characters represented by a string that roughly resembles the shape of the
pattern. I call it _Irregular Functions:tm:_.

Basically we just want basic grouping, the ability to quantify a group, the
ability to invert a character match, etc. So it'll be a stripped down language
inspired by regular expressions. Note that it is only _inspired_ by regex so I
actually _don't_ need a license.

We'll have the following features:

- `()` to group together patterns
- `(|)` to match either one pattern or another
- `[]` to match one out of a set of characters
- `[^]` to match anything other than a set of characters
- `*`, `?`, `+` to match a certain quantity of patterns

These are really all the basic features we need to be able to match code. As
you'll notice, this is structured data. To specify a string, for example, I
would want to write something like this: `"(\\"|[^"])*"`. This will match:

1. a double quote
2. zero or more of
   1. any character that's not a double quote
   2. a backslash then a double quote
3. a double quote

So this means we're going to need to parse out the data. I won't go into the
implementation details of that because it is a pretty basic recursive descent
parser and that's out of the scope of this article. Instead, we can talk about
dynamic arrays in comptime.

I mentioned at the beginning that memory can't be allocated in comptime. This
makes sense for a language design perspective because that really complicates
the boundary around transferring data from comptime -> runtime. Additionally,
the allocator API is implemented in the standard library, and allowing dynamic
allocation in comptime would force that API into the compiler. That's not
necessarily bad it's just not the direction that Zig wants to take.

However, this means that we also don't have a dynamic array at comptime. That's
a kinda useful data structure and I would like to use one, so let's build one. I
mentioned earlier that, while we can't dynamically allocate memory, we can
allocate arrays since we're in comptime. This means that we can implement
dynamic arrays ourselves.

Effectively, what we're doing is something like this:

```zig
fn ArrayList(comptime Item: type) type {
  return struct {
    const Self = @This();
    const EXPAND_AMOUNT = 8;

    items: []Item,
    len: usize,

    fn expand(self: *Self, amount: usize) void {
      var new: [self.items.len + amount]Item = undefined;
      @memcpy(new[0..self.items.len], self.items);

      self.items = &new;
    }

    fn append(self: *Self, item: Item) void {
      if (self.items.len <= self.len) {
        self.expand(EXPAND_AMOUNT);
      }

      self.items[self.len] = item;
      self.len += 1;
    }
  };
}
```

(This is pseudocode and I don't actually know if it'll work. The current and
admittedly bad implementation can be found [on Github](https://github.com/BSFishy/zig-lexer/blob/cbebf0b18800f11b33cc54437facb208f9528279/src/array_list.zig).
I was still learning Zig when I wrote this so it doesn't work the way I would
write it today but I haven't gotten around to refactoring it yet)

What we're doing at the end of the day is allocating a new array of length that
is a bit larger than what it currently is. About how you'd implement one for
runtime, we just have the benefit of not having to worry about an allocator.

Something to note here is that, while we can perform this sort of "dynamic
allocation", Zig also imposes a limit to the number of branches that can be
executed at comptime. This means that if we need to expand the array a whole
bunch of times during comptime, we'll eventually run out of quota. I think Zig
comptime is intended for pretty trivial cases, but I don't _really_ care. We can
extend the limit with the builtin function `@setEvalBranchQuota`. I do that, but
I won't include it in any of the examples here for brevity. Because there is
still a lot of code to get to.

## Building the data

Now that we have a bunch of parsed out patterns, we can start to make them
useful. The type of lexer we will build is based on a finite state machine.
Effectively, we want to build up a bunch of tables that point to other tables
based on the next character of input.

I'm not going to go into the full implementation details of this algorithm. But
effectively, we just recursively iterate through the characters of the pattern
and build up a graph representing the paths of that pattern. This process
generates jump tables. These are just maps from a character code to an index of
the next jump table. So our data structures end up looking something like this:

```zig
const JumpTables = struct {
  tables: ArrayList(JumpTable),
};

const JumpTable = struct {
  // the usize is an index into the tables array above
  chars: Map(u8, usize),
  sequences: Map(u8, usize),
  fallthrough: ?struct {
    char: u8,
    index: usize,
  },
};
```

What's great about getting this structure out the back end is that it ends up
just being data. In the compiled binary, it's just some bytes in one of the data
sections. So we can use it to lex input, but it's also just data that describes
our lexer. So our lexer is self describing. We can use that data to actually
visualize what our lexer looks like. So I also built out a little exporter to
graphviz to help with debugging the insertion algorithm, and here's what popped
out the backside :)

[![Graphviz visualization of the lexer](/lexer-graphviz.svg)][graphviz]

That's a simple grammar just to make sure the major features were implemented,
but it still helps to show the overall shape of what the lexer will be doing.
Each node on the graph represents a point in the input, and each branch from
that node represents a potential next character after the current character.

For this structure, we're going to want a map data structure. This'll be much of
the same implementing data structures to work in comptime. We'll use the
`ArrayList` struct that we've already built to build out the map. The
implementation details of data structures is out of the scope of this article,
so I'm not going to talk about it. Just know that our jump tables are just a
bunch of maps in an array.

## Using the data we built

Now that we've got this data, we can actually use it to process some input.
Effectively we want to iterate through the input text, tracking whichever jump
table we're at. At each character, we grab the current jump table, then match
the current character to a branch on the jump table. We set that index as the
current jump table and move on to the next character. It's actually a super
simple implementation, which is what's great about being able to generate this
data at compile time.

One thing to note, at this point is, how we pass data through the comptime to
runtime barrier. As you can imagine, Zig will be not too happy if you specify
these types wrong. This was a particular issue during development, where I
somehow started running into cases where the compiler wouldn't even emit an
error. It was just give me a red "errored" with no stack trace or anything. Heed
my warning and write your types correctly!

The main point is that data generated at compile time is constant. We need to
make sure the data we reference at runtime is all marked as constant. This also
includes converting arrays into many-item pointers. I guess slices can't pass
the boundary from some reason or another, but make sure you convert them. For
our `ArrayList` type, that may include writing a function to compile the array
into a constant many-item pointer.

```zig
fn ArrayList(comptime Item: type) type {
  return struct {
    // ...

    pub fn compile(self: *const Self) [*]const Item {
      const length = self.len;
      var items: [length]Item = undefined;
      @memcpy(items[0..], self.items[0..length]);

      const const_items = items;
      return &const_items;
    }
  };
}
```

Make sure you notice that line right before the return. I found that this line
is very important, and without creates those weird non-error errors. I guess
this solidifies the constant nature of the data? I don't really know. But this
should work. Just make sure you appease the Zig Gods and you should be fine.
Only constant data can come out of comptime.

Another thing is that you must call your comptime functions as const members of
returned structs.

```zig
fn Lexer(comptime tokens: anytype) type {
  return struct {
    const token_patterns = tokenPatternsFromTokens(tokens);
    pub const Token = compile_token_type(&token_patterns);
    const static_jump_table = compile_static_jump_map(&token_patterns, TokenType);

    // ... code that uses static_jump_table
  };
}
```

This is just another comptime boundary thing. Super minor, just don't try to
create a variable outside of the struct that uses it. This is an error, but
luckily one that Zig will bubble out to you.

## Using our data

So now that we are lexing through the input, we are on the home stretch.
Ideally, I want to have out an enum with each token pattern in it, fully type
checked and everything (reminder in case you forgot: we live in an ideal world).
Zig allows us to also construct data types programmatically. So since we already
just have an array with all our token patterns, we can turn those patterns into
enum variants and construct an enum representing each token variant.

```zig
fn compile_token_type(comptime token_patterns: []const TokenPattern) type {
  // initialize an empty array of fields to be put in the enum
  var enum_fields: [token_patterns.len]std.builtin.Type.EnumField = undefined;

  // iterate through the patterns
  for (token_patterns, 0..) |pattern, i| {
    // the enum field needs a null terminated string, so we build one here
    var name: [pattern.name.len:0]u8 = undefined;
    @memcpy(name[0..], pattern.name);

    // create the enum field and put it into the array
    enum_fields[i] = .{
      .name = &name,
      .value = i,
    };
  }

  // construct the enum type
  const tag = @Type(.{
    .Enum = .{
      // we also construct an int type here that only contains the number of
      // bits required to express each enum individual variant
      .tag_type = @Type(.{ .Int = .{ .signedness = .unsigned, .bits = @ceil(@log2(@as(f32, token_patterns.len))) } }),
      .fields = enum_fields,
      .decls = &.{},
      .is_exhaustive = true,
    },
  });

  // return a token type with a token variant and slice into the input
  return struct {
    token_type: tag,
    source: []const u8,
  };
}
```

So we can programmatically construct a type with the `@Type` builtin enum. This
takes in a
[`std.builtin.Type`](https://ziglang.org/documentation/master/std/#std.builtin.Type) and
returns a `type`. You can use this to generate any type you really want. The sky
is the limit. You can construct whatever shape or size you want. Go hog wild. I
won't judge. I built a lexer in comptime.

But this really gives us a nice development experience, because the compiler
runs this code at compile time, we get full type safety with it. If I try to
reference a type of token that I never specified to the original function, I'll
get compile errors. Additionally, we can extend it to not even include skipped
token patterns in that enum. So if we switch over the token variant, we won't
need to include those skipped variants that will never show up anyway.

## Reaping the rewards of our labor

By building out all of this stuff at comptime, we can actually start building
out some nice APIs for runtime, beyond just performing the lex. As an example,
wanting to shortcircuit a match on specific token types. Like, if I wanted to
parse out a literal expression. So a plain string or boolean value or integer or
whatever, as a AST node.

```zig
fn parseLiteralExpression(token: Token) ?Expression {
  switch (token.match(&.{ .String, .Boolean, .Integer })?) {
    .String => // ...
    .Boolean => // ...
    .Integer => // ...
  }
}
```

This is where I only want to need to handle a few different types of tokens in
this function. Everything else, I want to return a null. So I call the `match`
function, which takes in an array of token variants and return an optional token
that contains a variant of only the variants it got in and source slice. We can
effectively do identical to what we did with constructing the origin token type.

```zig
fn compile_token_type(comptime token_patterns: []const TokenPattern) type {
  return {
    // ...

    fn MatchedType(comptime tokens: []const tag) type {
      // construct the array of enum variants
      var token_types: [tokens.len]std.builtin.Type.EnumField = undefined;
      for (tokens, 0..) |token, i| {
        token_types[i] = .{
          .name = @tagName(token),
          .value = i,
        };
      }

      // construct the enum type
      const matched_tag = @Type(.{
        .Enum = .{
          .tag_type = @Type(.{ .Int = .{ .signedness = .unsigned, .bits = @ceil(@log2(@as(f32, tokens.len))) } }),
          .fields = token_types.get(),
          .decls = &.{},
          .is_exhaustive = true,
        },
      });

      return struct {
        token_type: matched_tag,
        source: []const u8,
      };
    }

    fn match(self: *const Self, comptime tokens: []const tag) ?MatchedType(tokens) {
      // inline the iteration through the provided list of tokens
      inline for (tokens, 0..) |token, i| {
        // check if the current token has a type equal to the iterated token
        // type
        if (token == self.token_type) {
          // if so, return the matched token type
          return .{
            .token_type = @enumFromInt(i),
            .source = self.source,
          };
        }
      }

      // if no token matches, return null
      return null;
    }
  };
}
```

Like I said, we're really just reaping the rewards of our labor at this point.
Nothing really new, just applying everything we already know to build a nice
little API for interacting with our system. The only real new thing here is the
inline for. This effectively just unrolls the loop for us at compile time, since
the array that we're iterating over is known at compile time.

And that's it! We've built out a really nice little lexer generator for super
quick and painless iteration. We used Zig's comptime system to its limits and
got a really nice little API out of it. I mainly wrote this because I ran into a
bunch of these issues when I was learning Zig comptime, so I hope you can take
away something and maybe write some cool comptime too :)

---

If you're interest, the full source code can be found [on
Github](https://github.com/BSFishy/zig-lexer).

Thanks for reading! My name is Matt and I'm super passionate about
language design and compiler architecture. I've been streaming exploring these
topics over [on Twitch](https://www.twitch.tv/mattprovolone), and built most of
this project on stream. If you have any questions or just want to chat about any
of this other stuff, feel free to stop by :)

[graphviz]: https://edotor.net/?engine=dot#digraph%20%7B%0A%20%20start%20-%3E%201%20%5Blabel%3D%22%2F%22%5D%3B%0A%20%201%20-%3E%20Division%20%5Blabel%3D%22super%20%2F%20leaf%22%20color%3Dblue%5D%3B%0A%20%20start%20-%3E%203%20%5Blabel%3D%22f%22%5D%3B%0A%20%203%20-%3E%20Ident%20%5Blabel%3D%22super%20f%20leaf%22%20color%3Dblue%5D%3B%0A%20%20start%20-%3E%206%20%5Blabel%3D%22%5C%22%22%5D%3B%0A%20%20start%20-%3E%20Newline%20%5Blabel%3D%22%5C%5Cn%20leaf%22%20color%3Dblue%5D%3B%0A%20%20start%20-%3E%208%20%5Blabel%3D%22%5C%5Cr%22%5D%3B%0A%20%20start%20-%3E%209%20%5Blabel%3D%22%5C%5Cw%22%20color%3Dorange%5D%3B%0A%20%209%20-%3E%20Ident%20%5Blabel%3D%22super%20%5C%5Cw%20leaf%22%20color%3Dgreen%5D%3B%0A%20%201%20-%3E%202%20%5Blabel%3D%22%2F%22%5D%3B%0A%20%202%20-%3E%20Comment%20%5Blabel%3D%22super%20%2F%20leaf%22%20color%3Dblue%5D%3B%0A%20%202%20-%3E%202%20%5Blabel%3D%22%5C%5Cn%22%20color%3Dred%5D%3B%0A%20%202%20-%3E%20Comment%20%5Blabel%3D%22super%20%5C%5Cn%20leaf%22%20color%3Dpurple%5D%3B%0A%20%203%20-%3E%204%20%5Blabel%3D%22u%22%5D%3B%0A%20%204%20-%3E%20Ident%20%5Blabel%3D%22super%20u%20leaf%22%20color%3Dblue%5D%3B%0A%20%203%20-%3E%2010%20%5Blabel%3D%22%5C%5CW%22%20color%3Dorange%5D%3B%0A%20%2010%20-%3E%20Ident%20%5Blabel%3D%22super%20%5C%5CW%20leaf%22%20color%3Dgreen%5D%3B%0A%20%204%20-%3E%205%20%5Blabel%3D%22n%22%5D%3B%0A%20%205%20-%3E%20Ident%20%5Blabel%3D%22super%20n%20leaf%22%20color%3Dblue%5D%3B%0A%20%204%20-%3E%2011%20%5Blabel%3D%22%5C%5CW%22%20color%3Dorange%5D%3B%0A%20%2011%20-%3E%20Ident%20%5Blabel%3D%22super%20%5C%5CW%20leaf%22%20color%3Dgreen%5D%3B%0A%20%205%20-%3E%2013%20%5Blabel%3D%22c%22%5D%3B%0A%20%2013%20-%3E%20Func%20%5Blabel%3D%22super%20c%20leaf%22%20color%3Dblue%5D%3B%0A%20%205%20-%3E%2012%20%5Blabel%3D%22%5C%5CW%22%20color%3Dorange%5D%3B%0A%20%2012%20-%3E%20Ident%20%5Blabel%3D%22super%20%5C%5CW%20leaf%22%20color%3Dgreen%5D%3B%0A%20%206%20-%3E%207%20%5Blabel%3D%22%5C%5C%22%5D%3B%0A%20%206%20-%3E%20%22String%22%20%5Blabel%3D%22%5C%22%20leaf%22%20color%3Dblue%5D%3B%0A%20%206%20-%3E%206%20%5Blabel%3D%22%5C%22%22%20color%3Dred%5D%3B%0A%20%207%20-%3E%206%20%5Blabel%3D%22%5C%22%22%5D%3B%0A%20%207%20-%3E%206%20%5Blabel%3D%22%5C%22%22%20color%3Dred%5D%3B%0A%20%208%20-%3E%20Newline%20%5Blabel%3D%22%5C%5Cn%20leaf%22%20color%3Dblue%5D%3B%0A%20%209%20-%3E%209%20%5Blabel%3D%22%5C%5CW%22%20color%3Dorange%5D%3B%0A%20%209%20-%3E%20Ident%20%5Blabel%3D%22super%20%5C%5CW%20leaf%22%20color%3Dgreen%5D%3B%0A%20%2010%20-%3E%2010%20%5Blabel%3D%22%5C%5CW%22%20color%3Dorange%5D%3B%0A%20%2010%20-%3E%20Ident%20%5Blabel%3D%22super%20%5C%5CW%20leaf%22%20color%3Dgreen%5D%3B%0A%20%2011%20-%3E%2011%20%5Blabel%3D%22%5C%5CW%22%20color%3Dorange%5D%3B%0A%20%2011%20-%3E%20Ident%20%5Blabel%3D%22super%20%5C%5CW%20leaf%22%20color%3Dgreen%5D%3B%0A%20%2012%20-%3E%2012%20%5Blabel%3D%22%5C%5CW%22%20color%3Dorange%5D%3B%0A%20%2012%20-%3E%20Ident%20%5Blabel%3D%22super%20%5C%5CW%20leaf%22%20color%3Dgreen%5D%3B%0A%20%2013%20-%3E%2014%20%5Blabel%3D%22%5C%5CW%22%20color%3Dorange%5D%3B%0A%20%2014%20-%3E%20Ident%20%5Blabel%3D%22super%20%5C%5CW%20leaf%22%20color%3Dgreen%5D%3B%0A%20%2014%20-%3E%2014%20%5Blabel%3D%22%5C%5CW%22%20color%3Dorange%5D%3B%0A%20%2014%20-%3E%20Ident%20%5Blabel%3D%22super%20%5C%5CW%20leaf%22%20color%3Dgreen%5D%3B%0A%7D%0A
