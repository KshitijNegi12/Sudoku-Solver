# Sudoku Solver

## Overview
This project is a simple Sudoku Solver web application that allows users to input known numbers into a Sudoku grid and automatically solves it using a backtracking algorithm. The application features a user-friendly interface with functionalities to solve or reset the grid.  
Check the website here [Live](https://kshitijnegi12.github.io/Sudoku-Solver/)
## Features
- **Interactive Sudoku Grid**: Users can input known numbers directly into the grid.
- **Solve Button**: Solves the Sudoku puzzle and fills in the remaining numbers.
- **Reset Button**: Clears the grid for a new puzzle.
- **Mobile Responsive**: Adjusts the layout and behavior for different screen sizes and devices.
- **Validation**: Detects invalid Sudoku inputs and prevents solving.

## Technologies Used
- **HTML5**: Structure of the application.
- **CSS3**: Styles the grid and layout.
- **JavaScript**: Handles the core logic, grid interaction, and solving the Sudoku puzzle using a backtracking algorithm.

## How to Use
1. Enter known numbers into the grid by clicking on the cells.
2. Click the **Solve** button to solve the puzzle.
3. To reset the grid and start a new puzzle, click the **Reset** button.
4. If an invalid input is detected (duplicate values in rows, columns, or subgrids), an alert will appear, prompting you to correct the input.

## How it Works
- The Sudoku solver uses a backtracking algorithm to recursively fill in valid numbers in empty cells until the puzzle is solved.
- Grid validation ensures no duplicate numbers exist in rows, columns, or 3x3 subgrids before solving.
- The solver highlights the solved numbers in blue to distinguish them from the user input.

Enjoy solving Sudoku puzzles with ease!