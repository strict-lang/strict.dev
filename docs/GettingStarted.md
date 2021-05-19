---
id: GettingStarted
title: Getting Started
---

Introduction guide and tutorials go here!

# Strict Is

* A computer language to be written by a computer programs (and humans) intelligently (not really calling this AI).
* Also readable by humans and convertible from other languages (starting with C#, must be TDD and functional, converting not functional .NET code is possible, but might lead to side effects and bad performance).
* Strongly typed, statically typed, while still looking dynamic and uses very strong references (null is never allowed, assignment is not allowed, reassigning to the same name is allowed, but otherwise a very functional like language).
* Able to infer types automatically, you never have to declare types in methods as variables (members) will be evaluated.
* Without access modifiers (public, private, protected, sealed, etc.) and has no static types, methods or members.
* Without classes or OOP. There are only types (like structs in Go) and methods (like functions) plus members in those (which are all statements after all and are assigned statement values). Still supports polymorphism through type nesting!
* Data is stored in components, which are used together in processors that do stuff with them (derived from DeltaEngine).
* Thread safe and uses threads automatically to execute any work (no need to worry about race conditions or locking).
* Uses fluent syntax (written as plain text with spaces, no `.` or camel case required) in Collapsed Mode.

The purpose of Strict is not to be human like or Artificially Intelligent, but actually be useful and intelligent in its own language context. The name Strict is used for the "intelligence" used by it to write code and evaluate it, which is what makes Strict understand its own code in its context. The whole point of this language is to give itself a way to change its own code automatically without human intervention, computers are taking over, but don't worry it won't do anything useful as it is safe like functional programs and without IO it cannot change any state.

"Strict language" or "Strict syntax" refers to the syntax of the language, usually we just talk about its Statements (there are no expressions in the language, everything is a statement, but in collapsed syntax we can make it look like usual expressions).

When a type like `size` is defined somewhere and we want to add new features, we do not have to derive from it. We can simply create a new `size` type matching the data and it can be used instead. A really bad example is C#, where you need many different size, point, etc. classes for different frameworks (Windows Forms, WPF, DirectX, XNA, DeltaEngine, OpenTK, etc.), but they are all identical except for maybe some additional methods here and there. Of course if we have access to the original `size` definition, we can just use that, which is the normal way to handle this. We also cannot have two conflicting `size` defined at the same time (or any method or member, or even anything conflicting with a sub context name, everything must be unique).

# Overview

* Created types are immutable and thread safe, type definitions are rarely changed, methods on them are very much so.
* There are standard ways to process data via an always defined "process" method, which is called automatically.
* Every type automatically has all operators defined, plus any member used it in allows it to be called for any method using that member as an parameter (e.g. `age` with `number years` can be called on any `number` method and if that method returns a number it will return `age` instead when called with `age` instead of `number`).
* Any created type (above build in types) can be accessed easily using a filter (e.g. `User(id is 1)` returns the user with id 1).
* Tests and TDD are mandatory, you cannot write any type or method without starting with failing tests first.
* Contracts help you and Strict to limit what a method allows as input and output (important to help Strict understand).
* Like in Go, types (components) do not contain methods, instead they just have members and methods are defined separately in processor methods, how this works can be seen in the DeltaEngine v0.9.13 already.
* The collapsed syntax is very similar to C#, Java and C++, there is however no concept of files, classes or OOP.
* Strict does not work with complete code text files like other languages. It uses one file per type and one file per method.
* Dependencies are not checked, Strict always assumes all types and methods used are available (this is how the IDE works, you cannot save any code that would not work). In networked environments Strict asks for dependencies.
* In the future the IDE allows to zoom into code via bubbles, but maybe that is not needed as components are flat. Adding types and methods is super simple, thus we might end up with thousands of files very quickly. Organization is important.
* Types and simplicity (in collapsed statements) are very similar to Go (which is statically typed and just has structs with interfaces and no methods) and Lua (and other dynamic languages, which all do not require explicit interfaces).
* Expanded syntax looks like nicely readable AST and can be seen as a machine understandable instruction list, which also helps debugging and understanding how things work, at any time you can dig in.
* Strict is not OOP (see polymorphism), and also not functional (it is close to functional programming and while very strict, the syntax is more direct, everything (e.g. members, methods) is a statement) or procedural, even though it looks like any of these.
* There is no inheritance (like duck typing (auto interfaces), but all types are always known), and everything is immutable and thread safe!
* The goal of Strict is not to be a computer language to be written by humans, they can do it, but in the long run an Intelligence should write the code and humans help by reading the code easily and correcting errors and giving help and answers to the Intelligence managing Strict. Code can be written by a programmer or Strict itself (later), usually collapsed statements are written (very similar to how programmers think like in C#, Java, etc.), directly imported from C# projects or other languages.

Strict is by no means a solution to writing computer programs for humans. Humans should continue to write code in the language they feel comfortable with and Strict can just call code made by them. With some work (TDD, Contracts, clear names and definitions) code can also be converted into collapsed syntax and with some care by humans to tell Strict its intentions (see below: Importing Code). There are much better and focused languages out there and while some ideas might be done well, nothing is really new, almost all of the low level ideas and statements can be found in other languages. The complexity of Strict is however much easier for itself to work with. Supporting to think in C#, Java, Lua, Go, Clojure, etc. would be many hundred times harder for a computer program, let's not talk about really ugly and powerful languages where the situation would be much worse like in native C++, Assembler, JavaScript, etc.

Dynamic languages would traditionally be a better fit for AI projects and one could argue a language like C# with dynamic features would be a good starting point (especially since Benjamin Nitschke, the inventor of Strict is extremely proficient at it). Strict is however 100% statically types and everything is known before any code is run. Its dynamic look comes from evaluating statements early and correctly connecting them to the correct types instead of duck typing and figuring it out at runtime (what dynamic languages do and give them a lot of flexibility, which is not needed in Strict anyway). The Strict language parser and evaluator itself is written in C# and 100% test driven, which is why it derives many features from it (especially expression trees to convert input code into Strict statements as described below).

# Importing Code

Importing code is not that hard, but very time consuming until it fits into the model of Strict. All language aspects need to be fully specified and filled out, Strict is a more detailed language, 100% tests and test coverage are needed, not just on a global scale, but each method itself must test itself, which is very different on how most programmers write code. It is much easier to just call external code, which is completely allowed (all .NET types and basic namespaces are always available, other things will be found in the GAC automatically, later we might include extra import statements to load more types or get external data over the internet or native code or other means). It is important to note that external code is NEVER understood by Strict or its governing intelligence, it is just something that can be called, but except for the context where it is used, there is no understanding how it works. This means the more external code Strict uses, the more powerful it gets, but also the more stupid it is. The goal is to use a few I/O related external methods, but keep everything else inside of Strict so the AI can benefit.

# Files: Types, Methods and their Statements

Files are only used to save the internal data of Strict. For simplicity and merging with source control tools these are just UTF-8 files, but the internal structure might change. Those files should not be edited outside of the IDE as there is no guarantee an edit (even as simple as just adding a space or changing a single letter) will not destroy all of the code in the file and everything referencing it! Naming files is also not possible, the names come from how the language looks at the syntax.

Files are NOT saved as plain editable text files, you can input statements and expressions as text, but internally everything is always stored, handled and displayed as nodes that can be expanded and collapsed, the whole IDE revolves around that fact (even though it might store it as mergeable UTF-8 text).
In fact the IDE does not show you files at all, you can open types and see methods allowed to operate on each type, each of these things is living in its own code bubble (looks like this in TODO:LightTable). Even if you work on a type and all its methods in one big statement list (okay, it would look mostly like a text file in an IDE), things are not saved this way!
Navigation supports jumping from a type to its methods (going in). When you go deeper into a method, the type disappears and you will only see the one method. You can go back with backspace, but you usually stay in a method or dig deeper there, see TODO:here for a nice video about this idea
Every action is stored in each code file (from the first statement written to the last change), everything can be reverted and more importantly Strict is free to modify all and any code file at any point to fit its needs. This is VERY different from traditional programming languages where everything is set in stones (as text files that only change if a human touches them and most of the time people have no tests and are too afraid to change anything).
Every member and type is linked to all its use cases and helps Strict to understand its purpose. If Strict does not understand some code well enough it might discard it and it needs to be explained better by writing it again. Strict should warn the programmer about these things in the future and allow talking to other machines as well to solve and understand code by looking at different code. Maybe we can also integrate asking questions on StackOverflow.
Refactoring is very strong, any code that looks similar to Strict will be merged and things not called often may be discarded. Strict only keeps types in memory that are actually used, if things are unused, they may be on disk, but not loaded and not known at runtime until someone invokes them and gets all the memory associated. Think of it as knowledge that is accessible, but hidden. Without invoking the correct entry points Strict does not know about the content, but when no answer is available it might poke around and find similar things. Naming is important.
Merging two Strict files will be done with traditional tools (git and mercurial merging, e.g. via `KDiff ` and `TortoiseHg`), they will stay in text format for now, but are read only (editing them outside of the IDE will destroy them most likely).
This all leads to files stored like this (the names are subject to change and files will look more complex with changes):

```
Vector2D.type
number x
number y
add.first(x.y).second(x.y).method

return
  new
    add
      first.x
      second.x
    add
      first.y
      second.y
```

The `Vector2D.type` class just describes the members of the `Vector2D` type, where it is defined is given by the folder name the file sits in. There is no more information in that file, all other information comes from users of this `Vector2D` type. The `add` method is accepting two parameters (`first` and `second`), which both must have `x` and `y` members that can be added. It does not care if the input is a `Vector2D` or anything else. A `Vector3D` would work as well or any other type that has `x` and `y`, but only if there is not another `add` method for it (would make sense to have an `add.first(x.y.z).second(x.y.z).method` for `Vector3D` of course). Please note that `add` is internally a special method that applies to all `add` calls, but that is no different from any other method call (they all share the same features), it is automatically converted from collapsed code where + operators are used.

Please note that this is just an example, add, subtract, multiply, divide, etc. are provided automatically for all types just containing numbers, you would never have to write those yourself, only if you want to change their behavior (multiply for matrix is not simply multiplying all values and you might want to have matrix multiplication with vectors).

Naming members is extremely important and refactoring their names is dangerous as all methods would have to change as well. As long as there are no other types also using those methods, it is easy to do, but if there are other users we are in trouble and renaming would cause other statements to be wrong. Renaming a method is simple in Strict, all its users are linked to it and are renamed automatically as they just use the same method via a reference (still causes lots of code to be changed and saved again, but the internal structure is completely unchanged, all that changes is a single string). In the example above the `add.first(x.y).second(x.y).method` cannot allow simply renaming the `x` and `y` members when `Vector2D` has changed as other users might rely on having that method to do their `x` and `y` adding. So instead what happens is that for a renamed member in a type all methods are duplicated to reflect the new naming. If Strict detects a method is not longer used by anyone, it will be "garbage collected" and removed automatically. In any case renaming members should happen early and not when there are a lot of users of a type already.

# Constant and Static

Sometimes you might want to reuse the same value over and over. If it just needed in a method (and nested methods, which is good practice in Strict) just declare a member and assign a constant value to it. The type will be inferred and the member is constant automatically (for any `number`, `bool`, or `string`). The same can be done when defining a type. In fact these constant members are always inlined and will make execution fast.

For loop iterators, list and map their values have to change over time. They are still immutable, but can point to a new instance when reassigning them (or when the next for loop iteration is started). For all other composed types the same applies, they are immutable too and assigning them again will just create a new instance and throw the old one away.

`Static` is very similar, but should be used less often and only if there is no way around it. The difference is that `static` allows remapping of the value as many times as you want and all threads get the new value when they access it next. `Static` is only allowed for `number`, `bool` and `string`, all other types cannot be safely modified and you should use different constructs to do `static`-like things. Go and Clojure have tons of tips on this. If possible try to use `static` only in the method where you need a static number you want to count up. If you really need it in multiple methods and have to share the same value, put it in the type. Strict will automatically refactor it into a method when only one method uses a static. Some examples:

```
user.type

number id
static idCounter = 0
string name
string email
create(name,email)user.method

id = idCounter
idCounter
  add
    idCounter
    1
```

**Note:**
As described in Statements, where this example is from, `name` and `email` are automatically assigned to the type members. All parameters of a method must always be used, otherwise the code is not valid.

```
calculator.type

Pi = 3.1415926
PiTimesTwo = 6.2831852
calculate(number)calculator.method

list[string] parts = input.split()
if parts[0] is "PI"
  return Pi
if parts[0] is "PI" and parts[1] is "*" and parts[2] is "2"
  return PiTimesTwo
if parts[1] is "+"
  return number.parse(parts[0]) + number.parse(parts[2])
error parts[1] + " is not supported"
```

# The Name Strict

Why the name Strict? Well, the language is very strict about its input, much more than all other languages, even Python is more flexible with empty lines, continuation lines, comments, etc. which are all absent in Strict. Even in collapsed mode the language always looks the same way, formatting is always the same and there is usually just one way to do things. Collapsed mode is only there for easier reading by humans and programmers and it reflects the expanded mode always in the same manner. If you look at the resulting expanded mode it is ridiculously easy with supporting only a few build in types and a handful of statements (around 10). Normally languages have 20-50 expressions supported built-in and depending on the language 20-100 statements and built-in keywords supported. Collapsed Strict is similar, but smaller, expanded Strict is much simpler (10x less). This is only possible by limiting what the language can do and hiding away many facets (like threading, exception handling, no generics, no overloading, etc.). Strict is not limiting itself to hurt a programmer (which is not supposed to write much code in the language anyway), but instead to enable its Intelligence to write code inside a very strict and rigid system where it cannot make many mistakes. By following TDD problems are also always encountered in a small context and refactorings help to only work on one issue at a time.

# AI

It is not clear yet, but Strict is probably way too restricted and extremely low level (much lower than C#, Java or C++) for a high level AI (like typical use scenarios for nowadays AIs). It is not the goal of Strict to talk to humans, detect pattern in the real world (pattern matching is however an important feature inside Strict’s own language), interpret images or English language or do human-like things, it is not the goal of this project whatsoever. Future projects that build on top of this can have this goal and the hope is that things will get easier once Strict is up and running, but it is hard to look into the future. It is more important to get this idea running and then see how it works out and how it can be used productively and scientifically. This means Strict is "just" the base level and higher constructs are built on top, think of it like neurons work, they are important, but you don't have think about them or even know them to make a thought. There are however still quite a few new different ideas directly in Strict, which is the reason it was invented instead of sticking to an existing language as you can see above.
