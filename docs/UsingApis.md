---
id: UsingApis
title: Using APIs
---

Strict doesn't try to reinvent the wheel. If there there is any library, framework or engine already out there in a supported backend language (C++, Java, C#, Ardunio, etc.) then lets use it. There is a lot of good talk about this in the [Entity-Boundary-Interactor docs](https://ebi.readthedocs.io/en/latest/index.html) used in Go or Elixir: [Talking to the External World](https://ebi.readthedocs.io/en/latest/external.html)

Sometimes things are not that simple and we can't just call a few methods and be done with it. A good example is integrating database storage support, where we need to map all of the types we want to store and maybe also have a layer of business logic to handle transformations and computations on top of the data.

Usual Database design goes like this (clean TDD way):
- Interfaces and abstract classes in some MyProject.Database project
- Adding MyProject.Database.Tests and MyProject.Database.Mocks
- Now implement actual database storage code like MyProject.Database.MongoDB
- Now onwards to the logic on top in another bunch of projects: MyProject.Logic, .Mocks, .Tests, etc.
- And so on till the application layer

We haven't even talked about what is in MyProject.Database and which other projecs need it. While it is easy to find database related code, this leads to a lot of messes. Each project and type that wants to do some database storage, needs to include the whole MyProject.Database project and all of its types and dependencies even if it only cares about 1-2 types in there.

# Solution
[Structure based on Intent](https://pasztor.at/blog/structure-based-on-intent), which basically tells us to structuing types by where they are used and needed, not by "database", "controllers", "models", etc.
There is also a [great video by Uncle Bob (plus some Clean Coders episodes talk about this as well)](https://www.youtube.com/watch?v=HhNIttd87xs) 

The first step to solve the problem from above is to make using the Database as simple as possible, so no helper classes needed, no base classes required. Just a library we can use and that works and is well tested internally already, lets say there is a Strict.Database.MongoDB package we can use. Now we just design the different use cases:
- MyProject.ImageProcessors (tests and mocks are all build in in Strict)
- MyProject.Robotics
- etc.

# Useful Links
[Functional Object Oriented Programming - FP and OOP working well together](https://pasztor.at/blog/functional-object-oriented-programming)
[One Controller One Action](https://pasztor.at/blog/one-controller-one-action)