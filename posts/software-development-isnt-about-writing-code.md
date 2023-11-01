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

At work, we are currently running a program called the [OpenSearch Contributor Initiative (OSCI)](https://opensearch.org/blog/Receive-mentorship-from-Amazon-engineers-and-accelerate-your-career-in-Tech/).
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

It's an incredible opportunity for people who are in college or just graduated or for people who recently finished a bootcamp or similar.
It's something that makes me extremely excited because I, myself, learned almost exclusively from open source projects.
I'm completely self-taught, never having done any sort of course, bootcamp, or formal education, and got all of my knowledge by reading and contributing to open source projects.
It is for that reason that I was immediately on board when my manager asked me if I wanted to mentor a group of contributors.

This has given me an interesting perspective into the mind of someone who is just getting started.
I started my software development journey when I was around 10 years old (now I'm 21, as of writing), and have completely forgotten what it's like to learn how to digest massive projects and learn about project-specific solutions.
Beyond all of that, it has also led me to reflect about how software development is taught in general.

I think the general sentiment around software development is that the job is to write code.
While that's not exactly a wrong observation - our deliverables are, of course, code - I think it's an over simplification.
It's like mopping the floor without fixing the leak.
If we don't properly understand the problem, our solutions are probably not going to be that great.
In other words, if we look at the problem as "the floor is wet," we're going to focus on making the floor not wet.
However, if we properly identify that the floor is wet _because_ there's a leak, we can effectively fix the issue.

And that brings me to the subject of this article: software development is about problem-solving, not writing code.
In the world of software development, there's a common misconception that can trip up even the most enthusiastic newcomers.
It's the idea that computers are essentially mysterious black boxes, performing unfathomable feats behind the scenes.
As a result, tasks like wielding a `memcpy` (for those who don't know, it's just a function that copies a block of memory from one place to another) function might appear as if they involve some form of digital sorcery.

However, the truth is far more approachable.
For those who've spent their fair share of hours in the code trenches, that same `memcpy` function becomes a familiar tool — a reliable, if meticulous, operation.
It's here that we begin to uncover the heart of software development.

In essence, it's not just about writing code—it's about solving problems.
The most skilled developers distinguish themselves not just by their ability to write lines of code, but by their knack for recognizing the underlying issues, envisioning elegant solutions, and then seamlessly translating them into executable instructions.

This takes the form of breaking a solution down to its most basic parts: those which are absolutely necessary for it to work.
Once we have the basic building blocks, they should be widely applicable; not _just_ applicable to your specific use-case.
We can then simply translate our solution into whatever language we're using.
It should be roughly 1:1 from concept to code.

To understand this a bit better, let's use the example of implementing our own `memcpy`.
To implement `memcpy`, we need some prerequisites to be met, so let's list those out:

 - A size of memory to copy, implying the need for basic integer support
 - A pointer to the source and to the destination, implying the need for pointer support
 - Simple looping functionality

Given these requirements, we can deduce that nearly every computer ever _should_ be able to support our `memcpy`.
So next would be actually coming up with the solution.
For something as simple as this, we can express our solution entirely with words.
In fact, most solutions should be able to be expressed entirely with words, without making any references to anything project-specific.

Our custom `memcpy` implementation is straightforward: with the given size to copy, `size`, along with source pointer `src` and destination pointer `dst`, iterate from 0 to `size`.
At each iteration (`i`), copy the `i`-th byte from `src` to the `i`-th byte in `dst`.
Notice how I don't make mention of any language, tool, framework, etc specific terminology.
This is on purpose.
Given this basic solution, it can be implemented nearly 1:1 in any language that supports the aforementioned prerequisites.

As an example, here is how this solution would look in pseudocode:

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

As you can see, the actual code itself isn't 1:1.
Rust needs a few extra goodies due to its type system, however, the logic itself is 1:1.
This logic could be effortlessly translated into any language that supports our basic prerequisites mentioned above.
Granted, there may be some level of syntactical difference, as we see between the C and Rust implementations.

The implementation for `memcpy` is fairly straight-forward.
So much so, that most developers could do it without any forethought (don't feel bad if you can't, though. Neither can a lot of other devs. This would be a package on NPM if JavaScript supported pointers).
But what happens when we try to implement something more complex, say a merge sort algorithm.
With something like that, it becomes significantly more difficult to start writing code without any forethought.

Now, I'm not going to go into the details of the merge sort algorithm, you can find those on its [Wikipedia page](https://en.wikipedia.org/wiki/Merge_sort).
My point still stands, though, that once you have that understanding of how merge sort works, you should be able to trivially implement it in any language that supports its prerequisites.

As you start to implement things under the lens of solving the problem and letting the code follow, you begin to come to a conclusion: code is merely a vehicle to transfer ideas from my head to the computer.
A programming language serves the exact same purpose as written language - to be a vehicle to transfer ideas.
If I were writing this article without knowing what I wanted to say, it would be a garbled mess that doesn't make any sense.
Your code is the exact same.
If you don't know what your code is supposed to do, it's probably not going to do what you want.

Consider for a moment that a problem in this realm could be as minute as crafting a precise function or as sweeping as architecting an entire application.
Yet, at its core, the process remains unchanged.
It starts with understanding the problem, envisioning a solution, and then, and only then, committing it to code.

This brings us to a fundamental realization: code, in its essence, is but a conduit—a vehicle to shuttle our ideas into the digital realm.
In this light, a programming language is akin to a linguistic bridge, a tool to translate our thoughts into a format the machine comprehends.
Just as a poorly constructed sentence leads to misunderstanding, code without a clear purpose can result in a befuddled application.

So, the next time you embark on a coding endeavor, remember this: let the problem steer your course, let the solution guide your hand, and let the code follow suit.
Embrace the art of problem-solving, for therein lies the true essence of software development.
With this perspective, you'll find that the most daunting tasks can be unraveled, and the most complex systems can be tamed.

In the end, what emerges is not just a functioning piece of software, but a testament to the ingenuity and creativity that underlie this ever-evolving field.
With each line of code, you're not just instructing a machine; you're imprinting a piece of your vision onto the digital landscape.
So, code on, not as a mere programmer, but as a problem-solver, a creator, and a craftsman of the digital realm.
