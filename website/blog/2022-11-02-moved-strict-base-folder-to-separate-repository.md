---
title: November 2022 Strict Base and Example folders moved to separate repository
author: Murali Tandabany
---

In strict, we usually store all the Strict.Base and Strict.Example folder inside the same Strict repository and load it from the path everytime the project starts. 

Now, we have moved both Strict.Base and Strict.Examples folder out of Strict source code repository and created a new repository inside strict-lang organization folder. We have also modified the Repository.cs to look for the Strict Base and Example folder files in the development folder (C:/code/GitHub/strict-lang/Strict.Base) and load them. If the files are not available in the development folder, then it will be downloaded from the GitHub repository directly and use them. 

One more change is also planned to implement package manager service to automatically sync the latest changes from GitHub to locally cached Strict Base and example files.

Here is the repository link of Strict Base and Example folder files.

Base - https://github.com/strict-lang/Strict.Base

Examples - https://github.com/strict-lang/Strict.Examples