---
title: The Flow of Execution
status: Draft
---
In imperative programming, a computer is given a list of instructions, called **statements**, to execute. Understanding the flow of execution – the order in which these statements are run – is crucial to knowing how your program will behave.

# Statements: The Building Blocks
Your pseudocode program is made up of statements. Each line or distinct instruction you write is typically a statement.

```
// This line defines a constant - it's a statement
CONST MAX_SCORE AS Integer <- 100;

// This line assigns a value to a variable - it's a statement
playerScore AS Integer <- 0;

// This line welcomes the user in some way - it's a statement
NOTIFY {{a welcome message}};
```

# Default Flow: Sequential Execution
Imagine reading a recipe or a checklist. You start at the top and go down, step by step. By default, Abali works the same way. Execution starts at the very first statement of your program and proceeds **sequentially**, one statement after the next, from top to bottom.

```
// 1. Start here
NOTIFY {{step 1, system is being initialized}};
// 2. Then execute this
count AS Integer <- 1;
// 3. Then execute this
NOTIFY {{step 2, count is @count}};
// 4. Program finishes (if this is the end)
```

The computer runs line 1, then line 2, then line 3, in that exact order.

# Changing the Flow: Control Statements
Sequential flow is simple, but not very powerful. What if we want to make decisions or repeat actions? For this, we use **control flow statements**. This type of statements consist of sections called **clauses**. Each clause is a group of one or more statements and can be ignored or run once or more depending on the conditions in the control statement.

# Inside Control Statements: Internal Flow
Control flow statements have their own internal logic that determines how execution proceeds within them. At the program level, these control flow statements are executed after the previous and before the next statement but from the internal viewpoint the flow of execution is NOT sequential and is specific to them.

## Type: The Very General view

Abali has the following control flows:

1. Execute a clause or jump over it depending on a condition.

2. Execute excatly one of two possible clauses depending on a condition.

3. Optionally execute a cluase out of many clauses depending on a condition.

# Summary
* Programs run **statements** one after another (**sequential flow**) by default.

* **Simple statements** (assignments, I/O, etc.) perform one action, then flow moves to the next statement.

* **Control flow statements** (`IF`, `WHILE`, etc.) alter the sequential flow.

* Control flow statements have **clauses** (conditions, blocks) and **internal logic** that decides which parts to execute and whether to repeat or skip, before flow continues to the statement after the control structure.

* Understanding this distinction between the overall sequential flow and the internal flow directed by control statements is key to writing effective pseudocode!
