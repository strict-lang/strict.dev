---
title: January 2022 Namings in Strict
author: Murali Tandabany
---

From the beginning, we never allowed numbers or special characters in the names of anything in Strict. Now, we have decided to allow them with strict limitations for package and type names as explained below. Other than package and type names, all other units in Strict are not allowed to have numbers or any special characters in their names.

## Naming Rules for Packages

Package names must start with alphabets only but can contain numbers or '-' in middle or end, all other characters are not allowed.

Examples: Allowed Package Names

```
Hello-World
Math-Algebra
MyPackage2022
```

Examples: Not Allowed Package Names

```
1MathVector
Hello_World
(CustomPackage)
```

## Naming Rules for Types

Type names must start with alphabets only and can contain number in the range from 2 to 9 as the last character. No multiple number digits are allowed in the type name. Another constraint in the type name is name without the last number character should not create any conflict with the existing type name.

Example: Allowed Type Names

```
Vector2
Matrix3
CustomType9
```

Example: Not Allowed Type Names

```
Vector0
Martix1
2Vector
Matrix33
Custom-Type9
```

Special rule for type names is when you already have an existing type named `Text` and if you try to created `Text2` then it is not allowed because `Text2` without 2 is creating a conflict in types therefore it is not allowed.

## All other Names

Except package and type, all other names such as method names, variable names, member names and parameter names must have alphabets only and no special characters or numbers allowed.