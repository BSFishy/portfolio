---
title: Software Development isn't About Writing Code
tagline: Stop learning wrong.
date: 2023-10-31T20:11:00.000-07:00
---

**Obligatory disclaimer:** This article is purely an opinion piece.
You may not agree with the opinions I express in this article.
If that is the case, congratulations!
You have an opinion!
However, given that this is a subject where an opinion can be had, one can deduce that there is no objective answer.
Given that I have already made up my mind and have an opinion, you will not be able to persuade me into your line of thinking, and I quite frankly do not care to argue about something that really doesn't matter.
With all that said, if you still feel any sort of animosity after reading this, I invite you to turn off your computer, walk outside, and touch grass.

**Additional mini-disclaimer:** I am an employee of Amazon Web Services.
Any opinions and/or statements in this article are expressly my own and do not represent the opinions or beliefs of Amazon Web Services.

---

At work, we've kicked off an exciting program called the [OpenSearch Contributor Initiative (OSCI)](https://opensearch.org/blog/Receive-mentorship-from-Amazon-engineers-and-accelerate-your-career-in-Tech/).
It's designed to provide mentorship and guidance to those embarking on their tech careers.
As the announcement post puts it:

> Many today find it challenging to navigate the rugged terrain on their journey to a career in Tech.
> You can’t know how long your chosen path will be, how difficult it will be, or even if it will lead to the desired destination.
> You might be questioning whether your coursework is genuinely preparing you for roles in major tech companies.
> In keeping with the theme of the image above, the OpenSearch Project presents an “Aerial Balloon Express” to bridge the skill and experience gap between your current position and your ultimate career destination.
>
> This proverbial “Aerial Balloon Express” is the Open Source Contributor Initiative (OSCI).
> Spanning 10 weeks, this fully remote program allows participants to receive mentorship from seasoned engineers within a nurturing and inclusive environment that fosters learning and collaboration.
> Participants in OSCI will work with Amazon engineers and will enhance their portfolios by directly contributing to a prominent open-source software project.

This program is a goldmine for recent grads, bootcamp alumni, or anyone eager to dive into the world of code.
Having trodden the self-taught path myself, I understand the power of open-source projects.
When my manager asked if I'd mentor a group of contributors, I didn't hesitate - I was on it like a developer racing to claim an unattended keyboard at a coding conference (this is a ChatGPT joke, don't @ me).

Mentoring these fresh faces has brought back memories of my own early days in code.
I started when I was around 10 (now I'm a seasoned 21), and let me tell you, I almost forgot what it's like to tackle massive projects and decipher project-specific solutions.
It's like navigating through a maze made of spaghetti code (again, ChatGPT (What?? I'm not a comedian, but I wanted jokes))!

Here's an observation that's been on my mind for a while, and only been amplified by this experience: software development is not just about typing lines of code.
That's akin to mopping the floor to fix a leaky faucet - it helps, but it doesn't get to the root issue.
We need to delve deep, understand the problem, and then apply our code wizardry.

We're not just coders; we're problem-solvers.
We're the detectives of the digital world, uncovering mysteries in those cryptic lines of code.
Take, for example, the infamous `memcpy` function.
To a newbie, it might as well be written in ancient hieroglyphics.
But to seasoned pros, it's like a trusty old toolbox - a bit meticulous, but no magic wands involved.

> For those who don't know, `memcpy` is a function in libc that copies a region of memory from one place to another.
> It's heavily used in languages like C to duplicate pieces of memory, similar to cloning in other languages.

Creating our own `memcpy` may sound daunting, but let's break it down.
We need a few basic prerequisites:

- A size of memory to copy, implying the need for basic integer support
- A pointer to the source and to the destination, implying the need for pointer support
- Simple looping functionality

Basic stuff, really.
With these essentials in hand, we're ready to dance.
And the beauty is, this dance is universal!
You can do it in any language that speaks the same prerequisites.

Our custom `memcpy` implementation is straightforward: given the size to copy (`size`), along with source pointer (`src`) and destination pointer (`dst`), iterate from 0 to `size`.
At each iteration (`i`), copy the `i`-th byte from `src` to the `i`-th byte in `dst`.
This solution can be implemented almost one-to-one in any language that supports the aforementioned prerequisites.

For instance, in pseudocode:

```text
function memcpy(int size, pointer src, pointer dst) {
    for i in range(0, size) {
        dst[i] = src[i];
    }
}
```

And here is how it would look in C (yes, I know the compiler will throw errors on the void pointer dereference, but it's fine, whatever, touch grass):

```c
void memcpy(unsigned int size, void* src, void* dst) {
    for (unsigned int i = 0; i < size; i++) {
        dst[i] = src[i];
    }
}
```

And in Rust:

```rust
unsafe fn memcpy<T: Copy>(size: usize, src: *const T, dst: *mut T) {
    for i in 0..size {
        *(dst.add(i)) = *(src.add(i));
    }
}
```

While the code may not be an exact match in different languages, variety is the spice of a coder's life.

This alignment between our initial conceptual breakdown and the actual code implementations underscores a crucial point.
The core principles of programming, such as memory manipulation and looping, are language-agnostic.
They form the foundation upon which all code is built.

This parallel serves as a testament to the beauty of programming.
It demonstrates that regardless of the language you choose, the fundamental logic remains consistent.
It's like different dialects of the same universal language.

Now, let's talk about facing off with a behemoth like a merge sort algorithm.
It's not about frenzied key-banging; it's about strategy, finesse, and a sprinkle of developer's intuition.
It's like chess, but with fewer knights and more parentheses.

I won't delve into the details of the merge sort algorithm (you've got [Wikipedia](https://en.wikipedia.org/wiki/Merge_sort) for that), but remember this: once you've got the algorithm in your pocket, you're like a chef who can whip up a gourmet meal in any kitchen!
The point is that more complexity requires more thought and more complex problem-solving.
A good merge sort implementation doesn't happen by smashing your head on the keyboard, but rather through planning.

So, here's the grand finale: code is our conductor's baton, our spellbook for the digital realm.
It's our Rosetta Stone, translating human thought into the language of machines.
Just like a well-crafted sonnet leads to a heart's flutter, elegant code leads to a seamless application.

As our journey through the thoughts and ideas of this article draws to a close, it's essential to reflect on the true essence of our craft.
We're not just coders; we're translators of thought into action.
Code is the bridge, the vessel that carries our ideas from the nebulous realm of imagination into the concrete world of execution.

Think of it as a grand conductor's baton, guiding a symphony of bits and bytes to create something tangible and functional.
Each line of code is a note in this digital sonata, harmonizing our intentions with the capabilities of the machine.
It's like a Rosetta Stone, decoding human logic into a language the computer comprehends.

Much like a composer sculpting a magnum opus, we craft algorithms and functions to perform intricate tasks.
We orchestrate loops and conditionals, letting our code sing in perfect harmony.
It's not just about typing characters on a screen; it's about composing a symphony of logic and functionality.

So, the next time you embark on a coding adventure, remember this: you're not just writing code; you're giving life to ideas, turning concepts into actions, and breathing vitality into the digital world.
Code isn't the end goal; it's the medium through which we manifest our visions.

With each keystroke, you're not merely instructing a machine; you're conducting a grand concerto of logic.
You're taking an abstract thought and sculpting it into a tangible reality.
Code is the brush with which we paint our digital canvases, the chisel with which we carve our digital sculptures.

Embrace this perspective, and you'll find that the most intricate problems can be unraveled, and the most ambitious projects can be realized.
Your code becomes more than a series of instructions; it becomes a testament to the ingenuity and creativity that define this dynamic field.

So, fellow code composers, let's continue to channel our ideas through the conduit of code.
Let the problem be the spark, the solution be the flame, and the code be the torch that illuminates the path from concept to reality.
With this perspective, you're not just a programmer; you're an architect of the digital realm, a maestro of thought-to-action, and a virtuoso of code.
Let's keep forging ahead, creating, and transforming ideas into digital masterpieces! :rocket: :sparkles:

---

> **ChatGPT disclaimer:** Yes, I used ChatGPT when writing this article.
> It was mainly used for editorial purposes; I wrote the whole article, then passed it through ChatGPT a few times, asking for specific things like more jokes, stronger analogies, etc.
> I occasionally used it to generate content, when I didn't know what to write, but I only gave the final stamp of approval after I did a final pass of editing myself and made sure it **accurately** reflects my ideas.
> If you want to see the full log of changes, including my first draft, check the [commit log on Github](https://github.com/BSFishy/portfolio/commits/main/posts/software-development-isnt-about-writing-code.md).

Thanks for reading!
This is the first time I've done something like this, and I enjoyed getting my thoughts onto paper (or rather a computer screen, I guess), so maybe you'll see more of me.

If you're interested in chatting (again, I really don't care to argue about the content of this article, it really doesn't matter), feel free to hit me up on Discord.
My username is @mattprovalone.

I'll probably be making some changes to the formatting of this page in the coming days, because I want to add some things like syntax highlighting and better markdown -> HTML, so if you come back later and it looks different, that's why :)
