---
id: If
title: If
sidebar_label: If
---

# If

`if` statements are simple and direct in Strict like any programming language:

```
let result = 5
if result is 5
  log.Write("It is 5")
else
  log.Write("It is not 5")
```

Like in any other programming language, `if` statement should start with if keyword followed by condition and then block of expressions with atleast one mandatory expression. `else` part is optional and block expressions should be tab indented in the beginning of the line.

# ConditionalIf

ConditionalIf is similar to If statements but the difference is ConditionalIf statements should only contain single expression in then and else block. Also else block is mandatory here. The syntax to write ConditionalIf statement is as follows,

```
condition expression '?' expression 'else' expression
```

Examples:
```
5 > 6 ? "Five is Greater" else "Five is Lesser"
```
