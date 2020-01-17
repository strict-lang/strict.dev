---
id: Keywords
title: Keywords
sidebar_label: Keywords
---

Strict Keywords are like go, python or C#

obsolete from old help:
# Files
Files are only used to save the internal data of Strict. For simplicity and merging with source control tools these are just utf-8 files, but the internal structure might change. Those files should not be edited outside of the IDE as there is no guarantee an edit (even as simple as just adding a space or changing a single letter) will not destroy all of the code in the file and everything referencing it! Naming files is also not possible, the names come from how the language looks at the syntax.

Files are NOT saved as plain editable text files, you can input statements and expressions as text, but internally everything is always stored, handled and displayed as nodes that can be expanded and collapsed, the whole IDE revolves around that fact (even though it might store it as mergeable utf-8 text).
In fact the IDE does not show you files at all, you can open types and see methods allowed to operate on each type, each of these things is living in its own code bubble (looks like this in LightTable). Even if you work on a type and all its methods in one big statement list (okay, it would look mostly like a text file in an ide), things are not saved this way!
Navigation supports jumping from a type to its methods (going in). When you go deeper into a method, the type disappears and you will only see the one method. You can go back with backspace, but you usually stay in a method or dig deeper there, see here for a nice video about this idea
Every action is stored in each code file (from the first statement written to the last change), everything can be reverted and more importantly Strict is free to modify all and any code file at any point to fit its needs. This is VERY different from traditional programming languages where everything is set in stones (as text files that only change if a human touches them and most of the time people have no tests and are too afraid to change anything).
Every member and type is linked to all its use cases and helps Strict to understand its purpose. If Strict does not understand some code well enough it might discard it and it needs to be explained better by writing it again. Strict should warn the programmer about these things in the future and allow talking to other machines as well to solve and understand code by looking at different code. Maybe we can also integrate asking questions on StackOverflow.
Refactoring is very strong, any code that looks similar to Strict will be merged and things not called often may be discarded. Strict only keeps types in memory that are actually used, if things are unused, they may be on disk, but not loaded and not known at runtime until someone invokes them and gets all the memory associated. Think of it as knowledge that is accessible, but hidden. Without invoking the correct entry points Strict does not know about the content, but when no answer is available it might poke around and find similar things. Naming is important.
Merging two Strict files will be done with traditional tools (git and mercurial merging, e.g. via KDiff and TortoiseHg), they will stay in text format for now, but are read only (editing them outside of the IDE will destroy them most likely).

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
The Vector2D.type class just describes the members of the Vector2D type, where it is defined is given by the folder name the file sits in. There is no more information in that file, all other information comes from users of this Vector2D type. The add method is accepting two parameters (first and second), which both must have x and y members that can be added. It does not care if the input is a Vector2D or anything else. A Vector3D would work as well or any other type that has x and y, but only if there is not another add method for it (would make sense to have a add.first(x.y.z).second(x.y.z).Method for Vector3D of course). Please note that add is internally a special method that applies to all add calls, but that is no different from any other method call (they all share the same features), it is automatically converted from collapsed code where + operators are used.

Please note that this is just an example, add, subtract, multiply, divide, etc. are provided automatically for all types just containing numbers, you would never have to write those yourself, only if you want to change their behavior (multiply for matrix is not simply multiplying all values and you might want to have matrix multiplication with vectors).

Naming members is extremely important and refactoring their names is dangerous as all methods would have to change as well. As long as there are no other types also using those methods, it is easy to do, but if there are other users we are in trouble and renaming would cause other statements to be wrong. Renaming a method is simple in Strict, all its users are linked to it and are renamed automatically as they just use the same method via a reference (still causes lots of code to be changed and saved again, but the internal structure is completely unchanged, all that changes is a single string). In the example above the add.first(x.y).second(x.y).method cannot allow simply renaming the x and y members when Vector2D has changed as other users might rely on having that method to do their x and y adding. So instead what happens is that for a renamed member in a type all methods are duplicated to reflect the new naming. If Strict detects a method is not longer used by anyone, it will be "garbage collected" and removed automatically. In any case renaming members should happen early and not when there are a lot of users of a type already.

# Constant and Static
Sometimes you might want to reuse the same value over and over. If it just needed in a method (and nested methods, which is good practice in Strict) just declare a member and assign a constant value to it. The type will be inferred and the member is constant automatically (for any number, bool or string). The same can be done when defining a type. In fact these constant members are always inlined and will make execution fast.

For loop iterators, list and map their values have to change over time. They are still immutable, but can point to a new instance when reassigning them (or when the next for loop iteration is started). For all other composed types the same applies, they are immutable too and assigning them again will just create a new instance and throw the old one away.

Static is very similar, but should be used less often and only if there is no way around it. The difference is that static allows remapping of the value as many times as you want and all threads get the new value when they access it next. Static is only allowed for number, bool and string, all other types cannot be safely modified and you should use different constructs to do static like things. Go and clojure have tons of tips on this. If possible try to use static only in the method where you need a static number you want to count up. If you really need it in multiple methods and have to share the same value, put it in the type. Strict will automatically refactor it into a method when only one method uses a static. Some examples:
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
Note: As described in Statements, where this example is from, name and email are automatically assigned to the type members. All parameters of a method must always be used, otherwise the code is not valid.
calculator.type
```
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