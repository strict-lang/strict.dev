---
id: CodingStyle
title: Coding Style
---

# Overview
These guidelines force any developer (human or AI) to write clean **Strict** code. Strict looks most like Python and is similar to C++, C#, Java or Go. Unlike other languages testing is not optional and writing ugly code is made impossible by enforcing hard rules (nonsensical code still is possible). [TDD](https://en.wikipedia.org/wiki/Test-driven_development) and [Clean Code](http://clean-code-developer.com/) is the basis for **Strict**. While you can modify the rules via the *build.yml* file as described below, no code will be accepted into the official framework or packages as it simply won't build with the default settings. We will not dive into details like the naming style, suffixes, etc. like [other guides](https://www.dofactory.com/reference/csharp-coding-standards) as it will be quite obvious when reading any code.

# IDE
The official [Strict IDE](https://github.com/strict-lang/ide) is based on IntelliJ and should feel familiar to any Java or C# (with ReSharper) developer (or PyCharm, Kotlin, etc.). The IDE is not required, you can also use Visual Studio Code or simply any text editor, but it is highly recommended to use [SCrunch](https://github.com/strict-lang/scrunch) continuous testing tool as build into the IDE.

The strict runtime, the language, framework and IDE follow the motto of *no logs, no errors, no messing around*. Whenever there is an issue in the code, an error is displayed and building won't be possible, it must be fixed first. This includes trying to write code without writing test code first. Code is also immediately executed, tested and optimized, unused code parts will be deleted, imports will be removed and added when needed and Strict might also restructure your code directly if there is a more efficient way.

# Naming conventions
Like in the normal engine, but a common pattern for Backend services is to have the interfaces in the main namespace (e.g. .Hosting, .Builder, .Tachyon, etc.) and the default or base implementation in Default (.Hosting.Default, .Builder.Default, etc.) with special implementations in other namespaces (e.g. Mocks, Spys or concrete services).

Example:
```
DeltaEngineBackend.{name}
High level API and data types, pretty much interfaces only, this is what is usually referenced except for the implementation project.
DeltaEngineBackend.{name}.Default
Default Implementations, which provide 90%+ of the needed functionality, but is extensible and can be replaced when needed. Only referenced in projects using this (or connecting the dots) plus tests. In case the default implementation is using a specific framework, that name is used instead (like it is done in the engine for OpenGL, SharpDX, GooglePlayServices, etc.)
DeltaEngineBackend.{name}.Server
```
If this namespace provides a service. The same goes for actual implementations like {GameName}.Server, which uses the other projects and implements the server for the game. All this is internally wired via extensions, look up the test projects or any server project to see how easy it works.


# Tests
Tests are always written first, test classes end with Tests and are in a separate project.
No Test project is allowed to reference any other Test project to keep projects testable independently.
Mocks don't belong into Test projects, create a separate Mock project instant (see ﻿Mock guidance for more information).
Always follow Clean Code and the TDD rules:
1. Write test code before production code. Work together with a team member to learn, it will require a lot of discipline and training.
2. Make tests work and only write what is necessary for the tests to work (no extra code, put research into extra tests or extra projects).
3. Refactor and make sure to get 100% coverage.
There are 3 kinds of tests, but all of them can be tested the same way (automatically via NCrunch (highly recommended), visually via ReSharper, or manually via Program.cs). With theTestWithMocksOrVisually class and the [Test] attribute you can easily combine automated tests and visual tests, with the [Test, CloseAfterFirstFrame] attributes you can mark tests as integration tests that will close immediately after running one frame. Both avoid duplicated code as everything in them is shared and tested automatically with Mocks using NCrunch all the time. This is especially true for integration tests, in particular graphics, multimedia, input, etc. tests, which need to be run with each framework separately. NCrunch will make sure that the overall logic works, manual testing is still required to confirm things are visible on screen, sound is working, etc. You can however also test all tests with ReSharper similar to our integration server, this will launch all tests and make sure they work (including making approval screenshots and comparing the result, quickly telling you if something broke).
```
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
Not only does this test all the code with NCrunch automatically, but you can also let NCrunch test all integration tests automatically for you when setting TestStarter.NCrunchIgnoreSlowTests = false;. This is normally annoying when actually working on code, but still great for code reviews and testing functionality of hundereds of tests quickly before starting to confirm them visually as well.

ReSharper (via F6, F8 or F9) or other test runners also work great together with the [Test] attribute, which utilizes the resolver in the current framework you are using (e.g. TestWithGLFW3 uses GLFW3Resolver in its TestWithMocksOrVisually class).

Of course all 3 test types are still available:
Automatic Unit Tests marked with the Test attribute (tested with NCrunch all day, each test MUST execute in below 10ms (without initialization), otherwise move it to Integration tests).
Note: When testing with ReSharper or NCrunch the first test might take an extra 100-200ms (or more when Moq is used) because of starting up and loading the assemblies for the first time, this can be ignored, all other tests will execute quickly. When just executing a single test, this overhead is also there, so don't use that time to measure automatic unit tests, always run them all.
```
[Test]
public void PointToString()
{
    var p = new Point(3, 4);
    Assert.AreEqual("(3, 4)", p.ToString());
}
```

# Mocks
Mocking is not easy, especially not for beginners and if the code is not written in a test driven manner or if the code comes from an outside framework that is generally hard to test. It is often misunderstood and not liked by many (even professional) programmers because it ads lots of extra code and overhead to your code base without any visible benefits to production code. Mocking is however crucial to testing and the code that is required to make code mock-able is usually required to get rid of dependencies anyway and will make the code much more stable, robust and easier to change because of tests that run all the time (via NCrunch). Visual and functional tests are great to verify UI and graphical behaviour, but you cannot run all visual tests in a project for every little change. You can however let NCrunch run all the tests all the time in the background! The most important aspect of mocking is making slow and external code run fast by just not executing it at all. Also only with Mocks it is possible to accomplish 100% automated code coverage (except for stuff that is mocked away like external frameworks and slow code, which we usually test with automated integration tests that run nightly).
To learn how to use mocking see how the Time class gets transformed to make it mockable and also easily extensible.
Most mocks are just stubs or fake objects to be able to test quickly without invoking slow framework methods (IO, GPU, API calls). Some times a spy is also useful to inspect inner data. For this reason mock, fake and spy classes can break some rules defined below for easy access (public static). For details see http://en.wikipedia.org/wiki/Test_double



# Limits
Public methods are also limited by 10 per class, private methods are not limited, but a class should be as short and concise as possible (around max. 200-400 lines). Each public method should be followed by the private methods that are called in it in the same order.

Each method should do one thing, and only have zero or one parameter. If required use two parameters, three should be the absolute limit. The same is true for constructor parameters, split up your functionality into several classes or use Property Injection if you need access to more things. The only exception should be constructors of manager type classes (but don't name them manager or helper), for example it is perfectly okay for the Input class to get injected by all kind of devices because that is what this class is for. Doing one thing means:
Methods called Get, Is, etc. should only grab data and not modify the instance at all! The should also not "do" anything except return existing values. Using simple calculations, ifs or dictionaries is okay.
Other methods should do something with the instance based on the passed in parameters (e.g. Save(filename) will save out the data to disk, Update will update a game tick) and not return anything.
Only Create or Load methods should actually create new instances and return them (e.g. Content.Load or BinaryFactory.Create)
Keep methods short. One method should not do all initialization, all loading, all conditional logic and all rendering functionality, split it up into multiple methods and call them all in your method (then it still does the same thing, but nothing of the original "doing" is left, the method has a new purpose now to call multiple low level methods).
Exception handling should be in its own method, it should only have one line to try something and the exception handler block (usually one line as well, max 3-5 lines per handler block, max 3handlers). See an example below.

Normally a method should only need 3-5 lines of code, the limit is 10 lines of code. The absolute limit is 20 lines and this should only be done in private methods and when you cannot avoid it (when switch statements or legacy code handling is required). Code reviews are essential to keep the code this simple! Comments are rarely needed for methods and it is usually a violation if you see any comment inside a method, especially for if statements or method calls. Try to incorporate the comment into the method call and simplify.

## Number Of Code Lines
| Code block      | Minimum | Good | Limit | Notes |
|----------------:|---------|------|-------|:-----:|
| test length     | 1       | 1-3  | 10    | Every method needs at least one test |
| method length   | 1       | 1-5  | 12    | Every method should be short and needs to return or do something |
| parameters      | 0       | 0-2  | 3     | Parameters should be kept to a minimum |
| fields          | 0       | 0-3  | 10    | Classes should not have too many parameters, split them up |
| public methods  | 1       | 0-3  | 5     | Classes must have at least one callable method, but not more than a few |
| private methods | 0       | 0-5  | 16    | Short helper methods are usually needed to get stuff done |
| line count      | 2       | 5-50 | 256   | Classes must be short and easily readable |
| nesting         | 0       | 1-3  | 5     | Do not use identation too much, same for packages and namespaces |

Compiling code that exceeds the limits is not possible unless you change the *build.yml* file. All limits can be configured manually in this file, but any code exceeding any of the limits above will not be accepted into the strict language sdk or default packages repository.

```yml
# build.yml
limits:
  publicMethods:17
  testLength:23
  nesting:7
```

# Concurrency
TODO: add concurrency discussion notes

Immutable types and thread safety
Like in many programming languages (Java, C#, Python) string and other build in types (number, int, bool) are immutable. Basically whenever you assign something different to them, they are a new instance. This makes them thread safe. In addition all types created in Strict are immutable (like in functional languages like F# or Clojure, which focuses on multithreaded robust programs by using immutable values).

Idea: Maybe all data should work like Event Sourcing, which means all data changes are recorded and can be played back: https://www.youtube.com/watch?v=8JKjvY4etTY This could help a lot, basically any variable is just created and from then on things are just applied on top of it (e.g. number starts with 0, then we add +1, and the result is the original number and everything that was applied to it). Obviously some caching would be useful, this would be very bad for performance.

As you can see from the operators on the statements page creating types happens via the build in create method, which is always available, but can also be customized for each type (like a constructor). Often writing this create method is not required and many types can be thought of as data containers like in Go. Go however has no constructors and you just would write a method to create your type, which is usually not required in Strict. For example simple data types almost require no special code like a Vector2D class has tons of build in functionality like a create method, adding, subtracting, etc. without having to write a single method.

Vector2D.type
number x
number y
Some methods are still useful to have like calculating the length of a vector.

length.x.y.method
return System.Math().Sqrt(x * x + y * y)

Like explained in the overview, any type that has x and y can now call this length method. You might notice that the Sqrt method of Math was invoked via System.Math(), which is calling the get method of System.Math. In this case System.Math is a static .NET class and we can access its static members this way via this default instance.

Not very useful for a Vector2D, you can also get a created instance via the get operator by writing Vector2D(x is 1). This will always return a valid Vector2D instance (remember, there are no null values allowed in Strict), if no Vector2D with x = 1 was ever created, a new Vector2D is created automatically. Alternatively you can ask if a Vector2D exists via Vector2D.exists(x is 1), which returns a bool. A better example would be a User with some simple members:

User.type

number id
string name
string email
You can immediately use this type, create new instances via User.create(1, "Ben") or check if a user exists via User.exists(id is 1) or User.exists(name is "Ben") or grab a user by its id or name in the same way, e.g. User(id is 1). However this might not be the way you want to create such users. Maybe you want to enforce a valid email and the id should never be set by the caller, but instead be calculated in the create method automatically. Then you would add a create method like this:

User.create.name.email.method

static number idCounter = 0
id = idCounter++
Since all instances are immutable we cannot store a unique id somewhere in the class accessible for all new instances. Instead we have to declare a static member (only visible to this method), which will only be created once and is available to all threads. Static members can only be thread safe types (build in types, like number, bool, string, list and map) and they work pretty much like const, except they are NOT immutable and can be changed via each call made to them. We exploit this here to easily count up the id. Please note that name and email are set automatically from the parameters of the method to the members of the type, no further action is required. User.create(1, "Ben") cannot compile now and needs to be changed. Using User.create() or User.create("Ben") is also not allowed as there is no explicit create method for those cases. In case we want to make email optional two methods are created.

Thread Safety
Here is a great long article of Threading in C#, and you can see from its length it is not an easy topic. We want to avoid all that hassle and provide a solid foundation in Strict so we can just write code and let it be executed on different threads automatically.

If immutable types are too restrictive we can fallback to STM (Software transactional memory) to easily allow changing data, there are some nice implementations available and this is what Clojure uses.

All Strict code must be thread safe as we will always execute it on multiple threads and machines, not knowing who executes it right now and we don't want to bother locking or taking care of race conditions. 

Links

http://blogs.msdn.com/b/ericlippert/archive/2007/11/13/immutability-in-c-part-one-kinds-of-immutability.aspx
https://github.com/jbakic/Shielded (.NET implementation of Software transactional memory)
http://en.wikipedia.org/wiki/Thread_safety
http://www.drdobbs.com/architecture-and-design/the-need-for-immutability/231000092

# Parallelism
Strict programming is not parallel, the code that is executed very much is so. You or Strict just write sequential code because that is how the hardware works on a low level. You can certainly call parallel methods (like Parallel.For for number crunching or even GPU code like with Cuda or OpenCL), but in general code that is written is executed sequentially (even without things like async and await, which are not present in the language, you would need to hock up a simple state machine to do that).

However, each call made to a function is not necessarily sequential, each call might be executed on a different task (locally on a machine via thread, but also can be on a different machine, see below). The language does not know anything about this, it just evaluates a statement and will wait by default a maximum of 1 second for Strict calls, anything longer is not allowed, external calls can take longer, but Strict keeps counting the time and might abort if it gets bored by waiting on any task for more than 60 seconds. Internally most calls happens on the same task, but depending on the structure of the code more tasks might be invoked. Strict knows the complexity of each thing that it calls, if it exceeds more than 1000 instructions or much more (10x+) than whatever the task switch cost is going to be, then each branch of calling the code (like a method call in a loop) is going to be executed in a different task.

Early versions of strict will just run locally in one thread (one task) and be fast because not much is going on. As things get slower and we will hit the 1 second call limit, things need to be parallelized. On a machine with 8 hyper threads this is going to work out for a while, but again at some point code needs to be moved from one machine to another and be executed remotely. Talking over threads or machines is going to be the same thing for tasks, the overhead for talking to other machines is however added to the task switching, which means if I can calculate it faster locally, then I am not going to call other machines for it.

It is very important to note that each task has its own memory and when spinning up a new task all input data needs to be fed into it, which might be huge and not worth the effort (especially sending big data over the network). Then tasks must be executed locally on a thread with a shared state, which will look EVERY non simple data type for each access (basically everything that is not a int, bool or number). This can be bad too, but slow code like that should be avoided and the system needs to refactor itself if it finds itself in a situation with slow code like this.

Implementation
Early implementations will just use Plinq and Parallel.Task, but only do so if the loop is huge or the statements called exceed a threshold (like the 1000 instructions listed above).

Here is a great read about Plinq, Parallel.Task and Concurrency in C# in general.