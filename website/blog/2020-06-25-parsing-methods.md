---
title: Jun 2020 Parsing Methods
author: Benjamin Nitschke
authorURL: http://twitter.com/BennyNitschke
---

As described last week I tried to simplify the Strict syntax and get some low level type, member and method parsing working in a new simplified respository: https://github.com/strict-lang/Strict

It took a few evenings to make sense of it, now we got a pretty decent simple packages, type, members and method definition parsing system in around 250 lines. No lexing or actual tokenized parsing is going on, Strict is very strict about the syntax and we can assume a lot of things and just abort if a file doesn't match the expected pattern.

However with methods there is obviously a lot of flexibility and even more rules, this approach isn't going to work. However using a full parser is not the best choice either as it allows way too flexible input (ignoring whitespaces, comments, tabs, spaces, extra spaces at end of lines or files), which we want to avoid. The goal is still to get a 1:1 mapping of compiled packages back to their source code without losing anything going back and forth. Plus we want to find one true solution to a problem and not allow many possible ways to do it (which is impossible to archieve, but at least we can limit the search space a lot).

# Alternatives

So I looked around in old code (including the sdk in go, older strict versions in C#, lua, python and C++). Code I found ranged from Domain-specific languages, simple state machine parsers, regex parsers, cool projects like [Sprache](https://github.com/sprache/Sprache) and [Superpower](https://github.com/datalust/superpower) and of course the many available full fletched parsers ([ANTLR](https://www.antlr.org/), [Irony](https://github.com/IronyProject/Irony), [etc.](https://tomassetti.me/parsing-in-csharp/#parseTree)), but nothing really fit out of the box. I tried plugging in some old code and got a few lines working, but I wasn't happy with the extra complexity.

# Parsing manually

I started back from the beginning with a very simple lexer and spits out tokens, which are then consumed by the MethodParser. Some parts might even be merged because the lexer isn't really doing much and the tokens have to be in an expected order anyway. But error reporting is nice this way and I am not sure about the complexity yet and we might be better off separating lexer, tokens and parsing so applying things like Observer pattern stays easy (have no usecase yet for that, so it is not implemented).

# Implemented Tokens

We use the lexer for each line and always start looking at the tabs first, we start at 1 and go deeper for nested statements (if, for, stream), there is no space following this token, but a space must be between every other token except ( and ).

- **test** is the first one in any method
- **(** and **)** are needed to pass in arguments to test and method calls
- **is** is our comparer (ala ==, which doesn't exist in Strict)
- **let** allows to create scoped assignments (ala const, reassignment isn't allowed in Strict without the mutable keyword)
- **identifier** to name let assignments, also might be a type, unknown here (actually we could know this and classify this different maybe)
- **=** assign values to let, has or parameters, any expression more complex than a const value can only happen in methods (we don't have a complex parser at member or parameter level anyway)
- **+** example binary operator for now

returns also has been removed in the last post, the last statement in a method must either be a non-return statement and thus makes the method not return anything (None) or return a value of a specific type.

if, for, etc. coming soon.

# Statements

- **MethodCall** test or any other method call, currently must include () to tell the parser this is a method call as opposed to a member or let
- **LetAssignment** assigns a value or expression to a local field
- **Return** ends the function and can return a value

As you can see all this is still very easy and allows me to experiment around with different ideas very quickly.

# Example

```ocaml
method Double(number)
  test(1) is 2
  let doubled = number + number
  return doubled
```

The let is obviously useless and would be optimized away (which means the source code would change to return number + number automatically and more optimizations based on that). The whole method doesn't make much sense and probably won't be allowed in some future version, i.e. removing and inlining all code would make it much clearer (especially by just replacing it with 2 * number).

All code can be found at the usual location, coverage is 100%, TeamCity does a lot of nice extra checks and the code is still very clean, nice and short: https://github.com/strict-lang/Strict