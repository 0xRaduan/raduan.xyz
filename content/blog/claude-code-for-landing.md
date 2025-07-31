---
title: How To Build Websites With Claude Code That Look Good
description: "A practical guide to building professional websites with Claude Code - from inspiration to polish. Learn how to avoid 'AI slop' and create something you're proud to sign your name on."
tags:
  - agentic-coding
  - guide
---
So, I got asked a question, on how to build non slop websites with claude code that do not look AI generated (or for some, more professional designers, that would be less sloppy websites), and I thought I would write a longer blog on that, because I couldn't really fit the whole process into one tweet...

You can read more about the product that I've built [here](https://x.com/0xRaduan/status/1948806857772204502), check it out [here](https://summate.io?ref=raduan.xyz), and check my older posts, where I've been sharing bits and pieces throughout the process.

Now, let's get into it.

TLDR in case you don't want to read the whole thing:

```
┌─────────────┐    ┌──────────────┐    ┌─────────────────┐
│ Inspiration │ ──▶│ Design System│ ──▶│Landing Structure│
└─────────────┘    └──────────────┘    └─────────────────┘
                                                  │
                                                  ▼
┌─────────────┐    ┌──────────────────────┐   ┌──────┐
│   Polish    │◀── │ Build Actual Sections│◀──│ Copy │
└─────────────┘    └──────────────────────┘   └──────┘
```

# 0. Backstory

I previously already had a landing page, which was basically a template that I bought + coded it up with Cursor, back in summer of 2023. It's been good. Decent conversion, people said it's great. Over time I decided to pivot the idea a bit, and also started seeing similar vibes of a landing page often, so it was time for a switch.

Now, that's where the process of creating a new landing page started.

I estimate, that it took me around 1 full-time week to build this new landing page, which was a bit distributed over the period of 2.5 weeks, because I was on and off on it and few other things at the time.

# 1. Inspiration

The number one thing that people get wrong is that they think that you somehow need to 'one shot' an ideal design. I started [gathering my inspiration](https://x.com/0xRaduan/status/1946128814117200087). How it looked? Essentially just a big big FigJam of everything that I liked.

![[images/claude-landing/inspiration-figjam.png]]
*My FigJam board with collected design inspiration for the landing page*

Hero. CTA. Problem Section. Solution Section. Bento boxes. Colors. Testimonials. Pricing. How it works. And so on. For every section that I liked, I found some inspiration.

Great websites to find inspiration for your new landing page:
- https://saaslandingpage.com/
- https://www.saasframe.io/
- https://www.landingpagesexplained.com/
	- More of a resource on how to build landing pages in general.
- https://21st.dev/
	- This is more of a component library, but you can get some inspiration on different parts of the landing and how they will look like
- https://mobbin.com
	- generally contains more established SaaS, nevertheless they have a ton of screens and components which might be valuable for inspiration purposes.
- Also I had some templates purchased already, and just seeing how things work there was already a big help!

# 2. Fonts and Color Palette
Next thing I did is basically sent all of the stuff I collected to the claude code, and said that I am looking to write a long guide on how to build a landing page. All of the examples that I've collected, mostly on color, style and also font.

It wrote me a 300+ line README.md file, which looked something like this:
![[images/claude-landing/style-guidelines.png]]
*300+ lines of design system documentation that kept Claude Code on track*

I believe this is a crucial step for building a new landing page, because if you don't have style guidelines, claude code can easily go astray(and it did multiple times for me, even with the guidelines).

Once I had this inspiration, I just asked Claude to tell me the best fonts, which aren't that popular, but can be used here. It suggested me 6-10 fonts, that I've tried, and then selected the ones I like.

I think many people miss out on this step of choosing the right font, because it can make your landing page hit or miss.

# 3. Landing Page Structure
Now that we have a guideline and also font, and overall have an idea for how different sections might look like, it's time to start writing the proper structure. 

Here is my process for this:

First, I have a special project in Claude that is called meta prompt optimizer. I come to it any time I need to optimize a system prompt for a particular role. 

It asks me clarification questions, and once it does, it gives me back an optimized prompt.
![[images/claude-landing/meta-prompt-optimizer.png]]
*Meta prompt optimizer that crafts the perfect system prompts*

Once I got an optimized prompt, I went in and created a new project with it...

We iterated a bit, and by the end of a 30-45 minute discussion, I had all sections ready + generally had an idea for the flow of sections(Hero -> Problem -> Solution -> ... and so on).

After I got the flow right, I started asking it to generate 3-4 ideas per section, on how exactly it would look like. Basically bouncing ideas off of it, and seeing which ones I personally like the most.

Some sections took 15 minutes, some sections took an hour, to make sure we got things right. I also asked it for different design concepts, that would match the story / format the way I wanted it to be.

# 4. Building the Landing
Once I finished a section from a copywriting and story perspective, I would go and build it right away.

If previously I would use Cursor, I realized that I need to micro-manage it quite a lot. Instead, what I decided to do, is just give all the information to claude code, and let it iterate until the point, where the landing works.

My prompts looked something like this:
```
Hey, I am building section {section name}, for my new landing page... 
For your context, we are following design guidelines from @/v2/landing/README.md ... 
Now, it's time to build! 

Here are some design inspirations of the format that I currently like:
[[Pasted Image 1]], [[Pasted Image 2]], ...

I want you to build it with ... and ... components from my existing component library.
```

Then go, grab a coffee, iterate a bit more on copy, do something else.

On average after 3-5 messages max, I would have a landing section, that was already 80 to 90% there.
# 5. Polishing the Landing

I genuinely resonate with this quote by [DHH](https://world.hey.com/dhh/believe-it-s-going-to-work-even-though-it-probably-won-t-58fd9dc5):
> Believe it's going to work.
> 
> Build it in a way that makes you proud to sign it.
> 
> Base your worth as a human on something greater than a business outcome.
Iterate on 3 and 4, and you have a landing page, that is functional, good and generally above the average in terms of style.

I wanted to go a bit deeper on the landing page, because you can tell whether it was polished or not. Obviously there are levels to this, and I am not on a level like other professional design engineers(i.e. [Rauno](https://x.com/raunofreiberg)), however I still wanted to see something that I myself enjoy seeing.

That brought me down the rabbit hole of micro interactions and custom showcase components, which I again did with Claude Code.

Perfect example of that: hover animations for svgs. Fully created with claude code, I mostly was just giving it ideas / discussing it with it, and then letting it implement them.

![[images/claude-landing/svg-hover-animation.gif]]
*SVG hover animations that make the landing feel alive - all coded by Claude*

Or this *custom digest* section, which is showing how people can create different digests with their favorite sources:
![[images/claude-landing/custom-digest-demo.gif]]
*The custom digest builder in action - showing how users can mix their favorite sources*

Overall, if I take a step back, polishing each section was one of the most crucial parts of the whole process.

Maybe, I could build a landing page in couple hours, if I didn't really pay too much attention to it, and wanted something working. That would inevitably be an 'AI slop'.

But now, I think that every time I land on this page, I am generally happy with how it turned out, and proud of what it became.

# 6. Conclusion
Claude Code is extremely powerful. I wouldn't be able to do this without Claude on the Web + Claude Code. Yes, I still was heavily involved in the process. But I feel like most of my time were spent on direction / figuring out what to do, rather than in the details of how to write code or how to create design, etc...

Previously I would spend enormous amount of time for something way worse than what I currently have, learning some useless tricks / implementation details.

I think my current knowledge helped me a lot, but the barrier for building this sort of thing decreased in the past 12 months.

![[images/claude-landing/summate-landing.png]]
*The final result: a landing page I'm genuinely proud to sign my name on*

Visit [Summate](https://summate.io?ref=raduan.xyz) yourself and let me know your thoughts.

In the next few posts, I will try to cover more details on how to use Claude Code for general coding, as well as all of my pro tips.