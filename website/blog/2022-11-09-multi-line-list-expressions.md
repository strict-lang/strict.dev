---
title: November 2022 Multi Line List Expressions
author: Murali Tandabany
---

In strict, majority of the expressions will contain less characters and the length of each line can be contained within 120 character which is the hard limit for any line in strict. One exception is the list type containing more number of elements and in few cases the line length can extend beyond 120 limit. 
Below is one example program where the list expressions line length goes beyond the maximum limit.

```
has numbers,
has anotherNumbers Numbers,
GetMixedNumbers Numbers
	(numbers(0), numbers(1), numbers(2), numbers(3), numbers(4), numbers(5), numbers(6), anotherNumbers(0), anotherNumbers(1), anotherNumbers(2))
```

## Multi Line List Expressions

In order to resolve this issue, we have introduced a new feature in Strict to support multi line List expressions. If any list expression which has length above 100 characters, then it is allowed to use multiple lines for the list elements with each list element in a separate line ending with comma. These lines should follow the same indentation as beginning line of the list expression.

The above program should be written as shown below using multi line list expressions.

```
has numbers,
has anotherNumbers Numbers,
GetMixedNumbers Numbers
	(numbers(0),
	numbers(1)
	numbers(2)
	numbers(3)
	numbers(4)
	numbers(5)
	numbers(6)
	anotherNumbers(0)
	anotherNumbers(1)
	anotherNumbers(2))
```

## Usage Not Allowed

If the total length of the list expression is below 100, then it is not allowed to use multi lines to write those list expressions and should be always written in a single line.

For example below program is not allowed in strict as the total length of the list expression is below 100 characters.

```
has log
Run
	log.Write((1,
	2,
	3,
	4,
	5,
	6,
	7))
```

For more information, please refer to the strict example programs in the GitHub repositories.