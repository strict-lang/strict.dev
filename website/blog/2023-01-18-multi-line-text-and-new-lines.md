---
title: January 2023 Multi Line Text Expressions and Introducing New Lines in Strict
author: Murali Tandabany
---

We added support for multi-line text expressions in Strict following the same approach we used to support multi-line List expressions. Along the same line, we also added support for New Lines inside text expressions. In this blog, we will discuss these both topics in detail.

## Multi Line Text Expression

When you want to create a text expression with length more than 100 characters, it is very much possible that you are going to violate the Strict line length limitation which is any line with more than 120 characters in it are not allowed and the compiler will throw an error immediately. To resolve this problem, we are now introducing support for multi line text expressions for the text values with length more than 100 characters at least. If your multi-line text expression character length is below 100, then compiler will not parse this as multi line and throw a compile time error to use single text expression instead.

Creating a multi line text expression is very easy in strict. All you need to do is add a '+' operator at the end of the expression and continue the remaining part of the expression in the next line. Please be aware that you still need to end the text expression before '+' operator by using double quotes and also start the next line with the same tab level and a opening double quotes before continuing the remaining text expression values.

Example:

```
has log
Run
	constant result = "This is considered to be some interesting text data that has more than hundred character length" +
	"so it is continuing in the next line using strict multi line expression syntax"
```

It is recommended to use large text content stored in a text file and then load it into the strict program using File type instead of storing them in the program directly.

The below usage of multi-line text expression is not allowed as the line length is below 100 characters.

```
has log
Run
	constant result = "Has less than hundred character" +
	"so it is not allowed to get compiled"
```

## New Lines in Text

Support for new lines is unavoidable in any programming language. Now, we have added support for `New Lines` in Strict Text values and in this section, we will discuss the syntax and usages of New Lines in Strict language.

The syntax to insert New Line is as follows,

```
Text.NewLine
```

This new line syntax can be used along with the text expression to insert a new line wherever required.

Examples:

```
has log
Run
	constant result = "First Line - Text data that has more than hundred character length" +
	Text.NewLine +
	"Third Line - so it is continuing in the second next line using strict multi line expression syntax" + Text.NewLine
```