---
title: July 2022 Introduction To Generics In Strict
author: Benjamin Nitschke & Murali Tandabany
---

It is true that we can have programming languages without supporting generics like first versions of Java (till much later) or C# (till .net 2.0) or Go (for 12+years). They didn't have generics at all and a programmer could do everything still fine using polymorphism and runtime checks as well. However, generics make things not just more flexible, but allow the compiler to do MANY checks before anything even runs. You can think of it as "anything can be a object" casted down to specific interfaces.

## How did we start implementing Generics in Strict?

We had to disallow ANY "any" for the moment to make the focus on generics very clear, we don't want the "Any" Type anymore except for the automatic base class (ala "object" in c#). This made many things to not compile or work. These things didn't really work anyway, they just compiled and would not run (except if just using "object" in the transpiled c#, but in cuda there is no equivalent)

## How did we fix it?

The first thing that didn't work anymore was all of the methods returning Any because we didn't had generics or conversions to get a type of an instance or converting from one instance type to another, e.g. BinaryOperator.strict (while this is not used directly, it directs on what the compiler will parse it as)

```
to(type) returns Any
to(any) returns Any
```

And there are many classes that use unknown things like HashCode.strict (which also will never be used directly, it is just explaining how it works)

```
has any -> these are clearly forbidden now, so we MUST use generics here or have a way to create types in code

to(type) returns Type(type)
```

The above line of code makes just more sense, the type will be the generic Type, we probably could just say "type" and mean "Type(type)" by that, which is a mouthful

```
to(any) // this is simply forbidden, you can only have specific types with to operator
to(Type(Number)) returns Number or
to(Type(Text)) returns Text
```

For HashCode just remove "has any", everything is already any, so no need to include it, the only problem here is when using "this" or "value" inside a method or expression, it will not be clear from where those are coming, but again this class is NOT used directly, it is just to explain how HashCode are calculated:

```
implement Number
Compute returns Number
    if value
        is Number
            return value
        is Text
            return value.Length
    else
        return 0
```
		
(btw: I invented switch statements here by allowing to split if expression into multiple choices), the "if value" can also be optimized to "if", which just forwards the "value" from the above scope to below. But this is yet to be implemented in the near future

## How to use Generics in Strict program?

Input.strict base type should be limited to what works for now and what is needed, which is Text reading

```
Read returns Text
```

If we need numbers or bytes or parsing in the future (xml, json, yaml, csv, etc.), we will add it when needed like ReadNumbers(separators Texts) returns Numbers, but we probably should think about how bytes make it through, how we can avoid saying "ReadNumbers" and then also having to say "returns Numbers", too much fluff

Output.strict is more complicated and could be solved with generics, but that is a really hard example to start with, also normally you just have a ton of methods for each type you allow to write (e.g. in java, c#, go, std, etc.), instead we just add the methods we need:

```
Write(text)
Write(number)
```

Remaining methods like Write(xml), Write(json), Write(type), etc. can be added when needed and we are not that far yet. Currently there is no method overloading, so maybe this is internally just a generic implementation or we just allow different parameters for the same named method (and just point to the correct one as we know each type at compile time so far). Only problem here is if there is polymorphism (which we also don't have yet), then the decision has to be still done at run time (compiler can only check that it makes sense up to the trait/interface)

## Applications of Generics

The first and important application of Generics inside Strict language is List which is the reason for implementing Generics at this time. Therefore, after Generics, statements like 

```
has anys -> won't be supported
```

Instead, we need to mention the specific type for example,

```
has numbers -> List of Number
has elements -> Numbers indirectly mean the same List of Number type
```

This means numbers is a type of List of Number and in this way the compiler will directly know the type without the need of conditional castings and thus makes all the operations of the type faster than before.
