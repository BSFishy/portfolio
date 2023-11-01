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
This is a program targeted at people who are just starting out their careers in tech, by offering mentorship and guidance in contributing to our project.
From the announcement post:

> Many today find it challenging to navigate the rugged terrain on their journey to a career in Tech.
> You can’t know how long your chosen path will be, how difficult it will be, or even if it will lead to the desired destination.
> You might be questioning whether your coursework is genuinely preparing you for roles in major tech companies.
> In keeping with the theme of the image above, the OpenSearch Project presents an “Aerial Balloon Express” to bridge the skill and experience gap between your current position and your ultimate career destination.
> 
> This proverbial “Aerial Balloon Express” is the Open Source Contributor Initiative (OSCI).
> Spanning 10 weeks, this fully remote program allows participants to receive mentorship from seasoned engineers within a nurturing and inclusive environment that fosters learning and collaboration.
> Participants in OSCI will work with Amazon engineers and will enhance their portfolios by directly contributing to a prominent open-source software project.

This program is a goldmine for college grads, bootcamp finishers, or anyone eager to dive headfirst into the world of code.
As someone who's been down the self-taught route, I know firsthand the power of open source projects.
So, when my manager asked if I'd mentor a group of contributors, I jumped on board faster than a developer racing to claim an unattended keyboard at a coding conference (this is a ChatGPT joke, don't @ me).

Mentoring these fresh faces has thrown me back to the days when I first dipped my toes into the vast ocean of code.
I started coding when I was around 10 (now I'm a seasoned 21), and let me tell you, I've almost forgotten what it's like to tackle massive projects and decipher project-specific solutions.
It's like trying to find your way through a maze made of spaghetti code (again, ChatGPT (What?? I'm not a comedian, but I wanted jokes))!

An observation that I've had brewing in my mind for a while has been exacerbated by this exposure.
Software development isn't just about typing out lines of code.
That would be like trying to fix a leaky faucet by mopping the floor.
Sure, it helps, but it doesn't tackle the root issue.
We've got to dive deep, understand the problem, and only then unleash our code wizardry.

So, here's the deal: we're not just coders, we're problem-solvers.
We're the detectives of the digital world, unearthing the mysteries hidden in those cryptic lines of code.
Take, for instance, the infamous `memcpy` function.
To a newbie, it might as well be written in ancient hieroglyphics.
But for us seasoned pros, it's like our trusty old toolbox—a bit meticulous, but no magic wands involved.

> For those who don't know, `memcpy` is a function in libc that copies a region of memory from one place to another.
> It's used a lot in languages like C to duplicate pieces of memory, the same way you might clone or duplicate in another language.

Let's talk about creating our own `memcpy`.
Sounds daunting, right?
But wait, let's break it down. There are a few basic prerequisites we need to identify:

- A size of memory to copy, implying the need for basic integer support
- A pointer to the source and to the destination, implying the need for pointer support
- Simple looping functionality

Basic stuff, really!
With these essentials in hand, we're ready to dance.
And the beauty is, this dance is universal!
You can do it in any language that speaks the same prerequisites.

Our custom `memcpy` implementation is straightforward: with the given size to copy, `size`, along with source pointer `src` and destination pointer `dst`, iterate from 0 to `size`.
At each iteration (`i`), copy the `i`-th byte from `src` to the `i`-th byte in `dst`.
Given this basic solution, it can be implemented nearly 1:1 in any language that supports the aforementioned prerequisites.

For instance, here it is in pseudocode:

```text
function memcpy(int size, pointer src, pointer dst) {
    for i in range(0, size) {
        dst[i] = src[i];
    }
}
```

And here is how it would look in C (I know the compiler will throw errors on the void pointer dereference, but it's fine, whatever, touch grass):

```c
void memcpy(unsigned int size, void* src, void* dst) {
    for (unsigned int i = 0; i < size; i++) {
        dst[i] = src[i];
    }
}
```

And here is how it would look in Rust:

```rust
unsafe fn memcpy<T: Copy>(size: usize, src: *const T, dst: *mut T) {
    for i in 0..size {
        *(dst.add(i)) = *(src.add(i));
    }
}
```

Sure, the code isn't always a carbon copy in different languages, but hey, who said variety wasn't the spice of a coder's life?

But here's where it gets juicy.
When you're facing off with a behemoth like a merge sort algorithm, it's not about banging on keys like a maniac.
It's about strategy, finesse, and a sprinkle of developer's intuition.
It's like chess, but with fewer knights and more parentheses.

Now, I won't dive into the details of the merge sort algorithm (you've got [Wikipedia](https://en.wikipedia.org/wiki/Merge_sort) for that), but remember this: once you've got the algorithm in your pocket, you're like a chef who can whip up a gourmet meal in any kitchen!

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
