---
id: CodingStyle
title: Coding Style
---

These guidelines force any developer (human or AI) to write clean **Strict** code. Strict looks most like Python and is similar to C++, C#, Java or Go. Unlike other languages testing is not optional and writing ugly code is made impossible by enforcing hard rules (nonsensical code still is possible and humans will sort out what makes sense and looks smart). [TDD](https://en.wikipedia.org/wiki/Test-driven_development) and [Clean Code](http://clean-code-developer.com/) is the basis for **Strict**. While you can modify the rules via the `build.yml` file as described below, no code will be accepted into the official framework or packages as it simply won't build with the default settings. We will not dive into details like the naming style, suffixes, etc. like [other guides](https://www.dofactory.com/reference/csharp-coding-standards) as it will be quite obvious when reading any code. Strict doesn't use fluff like curly brackets, colons, empty lines and comments are super rare, most code is simply code. Strict uses tabs (2 spaces per tab) and looks most like Python, but is much shorter and compact as methods are not allowed to be longer than a few lines (usually around 1-5 lines plus tests, max. 12 lines)

# Refactoring

Refactoring code is a big topic in major programming languages to clean up the mess programmers just make when experimenting, learning and quickly writing some code. Refactoring uses many rules to help you creating clean code. [Refactoring.guru]([https://refactoring.guru/refactoring/what-is-refactoring) is a great catalog for Refactoring, Code Smells and contains many examples.

In Strict it is simply not allowed to compile code that violates clean code or refactoring rules, the strict ruleset just does not allow to write bad code (you could still write useless or senseless code, but not in the sense of clean code). This is our main design goal when tuning the language).

# Recommended reading

We don't want to repeat other great style guides here, many things in Strict will be obvious once you see and understand any code for the first time. None of these guides are for Strict, but you get the point that a clear ruleset is great for very flexible languages like C, Java, C# or Python. With Strict these kind of guides are not really needed as the IDE and compiler will enforce the hard rules anyway, so it is impossible to write code that doesn't follow those rules (unlike all the guides linked here). Still these are great reads:

- [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) - best book on TDD and SOLID principles
- [Code Complete 2](https://www.amazon.com/gp/product/0735619670/) - a good handbook for programming best-practices
- [Flutter Style Guide](https://github.com/flutter/flutter/wiki/Style-guide-for-Flutter-repo) - Great read, for Dart, lots of good topics like Philosophy, Lazyness, Avoiding, Policies, etc.
- [Twitter Style Guide](https://github.com/twitter-archive/commons/blob/master/src/java/com/twitter/common/styleguide.md#recommended-reading) - Another detailed guide for Java, well written and precise, with tests and best practices
- [DeltaEngine Coding Style C#](http://deltaengine.net/learn/codingstyle) - For .NET and C#, mostly from the perspective of writing games and heavy focus on TDD and clean code. Also good tooling overview, which is often not mentioned or non-existent for many open source languages

# IDE

The official [Strict IDE](https://github.com/strict-lang/ide) is based on IntelliJ and should feel familiar to any Java or C# (with ReSharper) developer (or PyCharm, Kotlin, etc.). The IDE is not required, you can also use Visual Studio Code or simply any text editor, but it is highly recommended to use [SCrunch](https://github.com/strict-lang/scrunch) continuous testing tool as build into the IDE.

The Strict runtime, the language, framework and IDE follow the motto of _no logs, no errors, no messing around_. Whenever there is an issue in the code, an error is displayed and building won't be possible, it must be fixed first. This includes trying to write code without writing test code first. Code is also immediately executed, tested and optimized, unused code parts will be deleted, imports will be removed and added when needed and Strict might also restructure your code directly if there is a more efficient way.

# Naming conventions

Like in the normal engine, but a common pattern for Backend services is to have the interfaces in the main namespace (e.g. `.Hosting`, `.Builder`, `.Tachyon`, etc.) and the default or base implementation in `Default` (`.Hosting.Default`, `.Builder.Default`, etc.) with special implementations in other namespaces (e.g. Mocks, Spys, or concrete services).

Example:

```
DeltaEngineBackend.{name}
High level API and data types, pretty much interfaces only, this is what is usually referenced except for the implementation project.
DeltaEngineBackend.{name}.Default
Default Implementations, which provide 90%+ of the needed functionality, but is extensible and can be replaced when needed. Only referenced in projects using this (or connecting the dots) plus tests. In case the default implementation is using a specific framework, that name is used instead (like it is done in the engine for OpenGL, SharpDX, GooglePlayServices, etc.)
DeltaEngineBackend.{name}.Server
```

If this namespace provides a service. The same goes for actual implementations like `{GameName}.Server`, which uses the other projects and implements the server for the game. All this is internally wired via extensions, look up the test projects or any server project to see how easy it works.

# Tests

* Tests are always written first, test classes end with Tests and are in a separate project.
* No Test project is allowed to reference any other Test project to keep projects testable independently.
* Mocks don't belong into Test projects, create a separate Mock project instant (see ﻿Mock guidance for more information).

Always follow Clean Code and the TDD rules:

1. Write test code before production code. Work together with a team member to learn, it will require a lot of discipline and training.
2. Make tests work and only write what is necessary for the tests to work (no extra code, put research into extra tests or extra projects).
3. Refactor and make sure to get 100% coverage.
   There are 3 kinds of tests, but all of them can be tested the same way (automatically via NCrunch (highly recommended), visually via ReSharper, or manually via `Program.cs`). With the `TestWithMocksOrVisually` class and the `[Test]` attribute you can easily combine automated tests and visual tests, with the `[Test, CloseAfterFirstFrame]` attributes you can mark tests as integration tests that will close immediately after running one frame. Both avoid duplicated code as everything in them is shared and tested automatically with Mocks using NCrunch all the time. This is especially true for integration tests, in particular graphics, multimedia, input, etc. tests, which need to be run with each framework separately. NCrunch will make sure that the overall logic works, manual testing is still required to confirm things are visible on screen, sound is working, etc. You can however also test all tests with ReSharper similar to our integration server, this will launch all tests and make sure they work (including making approval screenshots and comparing the result, quickly telling you if something broke).

```c#
public class DeviceTests : TestWithMocksOrVisually
{
  [Test, ApproveFirstFrameScreenshot]
  public void DrawRedBackground()
  {
    Resolve<Window>().BackgroundColor = Color.Red;
  }

  [Test]
  public void SizeChanged()
  {
     Resolve<Window>().ViewportPixelSize = new Size(200, 100);
     Assert.AreEqual(new Size(200, 100), Resolve<Window>().ViewportPixelSize);
   }
 }
```

Not only does this test all the code with NCrunch automatically, but you can also let NCrunch test all integration tests automatically for you when setting `TestStarter.NCrunchIgnoreSlowTests = false;`. This is normally annoying when actually working on code, but still great for code reviews and testing functionality of hundreds of tests quickly before starting to confirm them visually as well.

ReSharper (via `F6`, `F8` or `F9`) or other test runners also work great together with the `[Test]` attribute, which utilizes the resolver in the current framework you are using (e.g. `TestWithGLFW3` uses `GLFW3Resolver` in its `TestWithMocksOrVisually` class).

Of course all three test types are still available:
Automatic Unit Tests marked with the `Test` attribute (tested with NCrunch all day, each test MUST execute in below 10ms (without initialization), otherwise move it to Integration tests).
Note: When testing with ReSharper or NCrunch the first test might take an extra 100-200ms (or more when Moq is used) because of starting up and loading the assemblies for the first time, this can be ignored, all other tests will execute quickly. When just executing a single test, this overhead is also there, so don't use that time to measure automatic unit tests, always run them all.

```c#
[Test]
public void PointToString()
{
    var p = new Point(3, 4);
    Assert.AreEqual("(3, 4)", p.ToString());
}
```

# Mocks

Mocking is not easy, especially not for beginners and if the code is not written in a test driven manner or if the code comes from an outside framework that is generally hard to test. It is often misunderstood and not liked by many (even professional) programmers because it ads lots of extra code and overhead to your code base without any visible benefits to production code. Mocking is however crucial to testing and the code that is required to make code mockable is usually required to get rid of dependencies anyway and will make the code much more stable, robust and easier to change because of tests that run all the time (via NCrunch). Visual and functional tests are great to verify UI and graphical behavior, but you cannot run all visual tests in a project for every little change. You can however let NCrunch run all the tests all the time in the background! The most important aspect of mocking is making slow and external code run fast by just not executing it at all. Also only with Mocks it is possible to accomplish 100% automated code coverage (except for stuff that is mocked away like external frameworks and slow code, which we usually test with automated integration tests that run nightly).
To learn how to use mocking see how the `Time` class gets transformed to make it mockable and also easily extensible.
Most mocks are just stubs or fake objects to be able to test quickly without invoking slow framework methods (IO, GPU, API calls). Some times a spy is also useful to inspect inner data. For this reason mock, fake and spy classes can break some rules defined below for easy access (`public static`). For details see http://en.wikipedia.org/wiki/Test_double

# Limits

Public methods are also limited to 10 per class, private methods are not limited, but a class should be as short and concise as possible (around max. 200-400 lines). Each public method should be followed by the private methods that are called in it in the same order.

Each method should do one thing, and only have zero or one parameter. If required use two parameters, three should be the absolute limit. The same is true for constructor parameters, split up your functionality into several classes or use Property Injection if you need access to more things. The only exception should be constructors of manager type classes (but don't name them manager or helper), for example it is perfectly okay for the `Input` class to get injected by all kind of devices because that is what this class is for. Doing one thing means:

1. Methods called `Get`, `Is`, etc. should only grab data and not modify the instance at all! The should also not "do" anything except return existing values. Using simple calculations, `if`s or dictionaries are okay.
2. Other methods should do something with the instance based on the passed in parameters (e.g. `Save(filename)` will save the data to disk, `Update` will update a game tick) and not return anything.
3. Only `Create` or `Load` methods should actually create new instances and return them (e.g. `Content.Load` or `BinaryFactory.Create`).
4. Keep methods short. One method should not do all initialization, all loading, all conditional logic and all rendering functionality, split it up into multiple methods and call them all in your method (then it still does the same thing, but nothing of the original "doing" is left, the method has a new purpose now to call multiple low level methods).
5. Exception handling should be in its own method, it should only have one line to try something and the exception handler block (usually one line as well, max 3-5 lines per handler block, max 3handlers). See an example below.

Normally a method should only need 3-5 lines of code, the limit is 10 lines of code. The absolute limit is 20 lines and this should only be done in private methods and when you cannot avoid it (when `switch` statements or legacy code handling is required). Code reviews are essential to keep the code this simple! Comments are rarely needed for methods and it is usually a violation if you see any comment inside a method, especially for if statements or method calls. Try to incorporate the comment into the method call and simplify.

## Number Of Code Lines

|      Code block | Minimum | Good | Limit |                            Notes                                        |
| --------------: | ------- | ---- | ----- | :---------------------------------------------------------------------: |
|     test length | 1       | 1-3  | 10    |             Every method needs at least one test                        |
|   method length | 1       | 1-5  | 12    | Every method should be short and needs to return or do something        |
|      parameters | 0       | 0-2  | 3     |            Parameters should be kept to a minimum                       |
|          fields | 0       | 0-3  | 10    |  Classes should not have too many parameters, split them up             |
|  public methods | 1       | 0-3  | 5     | Classes must have at least one callable method, but not more than a few |
| private methods | 0       | 0-5  | 16    |  Short helper methods are usually needed to get stuff done              |
|      line count | 2       | 5-50 | 256   |          Classes must be short and easily readable                      |
|         nesting | 0       | 1-3  | 5     | Do not use indentation too much, same for packages and namespaces       |
|         comment | 0       | 0    | 3     | Do not use comments, only allowed before methods for extra help         |

Compiling code that exceeds the limits is not possible unless you change the `build.yml` file. All limits can be configured manually in this file, but any code exceeding any of the limits above will not be accepted into the strict language SDK or default packages repository.

```yml
# build.yml
limits: publicMethods:17
  testLength:23
  nesting:7
```

# References

Fun read of a 25+ year old Java Convention from Oracle, so much fluff: https://www.oracle.com/java/technologies/javase/codeconventions-fileorganization.html

