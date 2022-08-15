# Contributing to Boilertowns

Hi! Thank you for your interest in Boilertowns! Your contributions are very welcome and valuable to Boilertowns ❤️

Before submitting your contribution, please make sure to take a moment and read through the following guide:

## Setup

- Follow [this instruction](https://pnpm.io/installation) to install `pnpm`.

- Fork this repository to your own GitHub account and clone it to your local machine.

  ```sh
  git clone https://github.com/[your-username]/create-boilertowns.git
  cd create-boilertowns
  ```

- Create a new branch.

  ```sh
  git checkout -b MY_BRANCH_NAME
  ```

- Install dependencies:

  ```sh
  pnpm install
  ```

## Add a new boilerplate

- You can add your favourite boilerplate by simply running command:

  ```sh
  pnpm run boilerplate:add
  ```

- Answer all the questions.

- Create changeset file and write a summary:

  ```sh
  pnpm changeset
  ```

- Commit all the changes to GitHub.
- Open a pull request and wait for approval.

## CLI Development

- You can start developing `create-boilertowns` locally by runing:

  ```sh
  pnpm run dev
  ```

- Create changeset file and write a summary:

  ```sh
  pnpm changeset
  ```

- Commit your changes.
- Open a pull request and wait for approval.
