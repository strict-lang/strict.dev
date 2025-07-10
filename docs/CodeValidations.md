---
id: CodeValidations
title: Code Validations
---

In the pipelines of the Strict compiler, after the parser's job is done, we will feed the parsed expressions AST as the input to the Code Validator and the responsibility of the code validator is to run a certain set of validation rules (listed and explained below in this page) against the AST (may be code lines as well if needed) and flag any found violations to the user with as much error details as possible. Otherwise, the parsed AST will be allowed to be fed into the next stage of the Strict compiler which is code optimizer

The reason for checking the validation rules after parsing is successfull because the code can get executed without these rules as well. In other high level programming languages, these code validation rules are considered as Warnings but Strict enforces these rules strictly and throws error back to the user to fix the validation failures and won't compile the code until all issues are resolved. This again ensures the efficiency of the code and makes the programmer job easier to use every feature in a single way which also makes the Strict programming language unique from other languages.

## Code Validation Rules

We splitted the rules into two categories at the moment which are type level rules and method level rules. Both rule sets will be discussed below.

## Type Level Validations

`Unused Member` -  If a member is declared in a type but never accessed in any of its methods, then this rule will flag the error to the programmer to remove that member declaration from the type.

## Method Level Validations

1. `Unused Method Variables` - Checks all the method variables inside a method and flags error if any of the variables are declared as constant or mutable but never accessed again in the method. It will suggest the programmer to remove that unused variable from the method declaration to pass this validation rule.

2. `Unused Method Parameters` - Checks all the method parameters of the method and flags error if any of the parameters are not access inside the method. It will suggest the programmer to remove the unused parameter from the method declaration to pass this validation rule.

3. `Unchanged Mutable Variables` - This rule checks for any variable declared as mutable inside the method scope but the value was never changed again in the method. i.e. the purpose of declaring the variable as mutable is not used which is clearly useless. Compiler error will be thrown to the user to change the variable type to constant from mutable.

4. `Avoid Double Brackets for arguments which can be auto parsed into list` - Strict supports automatic parsing of multiple arguments of same type into a list type if the method parameter expects a single argument of type List with matching implementation type (argument type should match with list implementation type). Therefore, there is no need to use double brackets in this case when strict can auto parse it. This rule checks if double brackets are present for the a method call where the above feature can be applied and flags error to use single brackets instead.