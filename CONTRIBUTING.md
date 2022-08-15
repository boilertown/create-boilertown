# Contributing to Boilertowns

Hi! Thank you for your interest in Boilertowns! Your contributions are very welcome and valuable to Boilertowns ❤️ Before submitting your contribution, please make sure to take a moment and read through the following guide:

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

> Please note these when creating a pull request:
>
> 1. Only add 1 boilerplate per pull reuqest.
> 2. If the boilerplate is not yours, help me inform its authors/maintainers by tagging them in your pull request description.

- You can add your favourite boilerplate by simply running command:

  ```sh
  pnpm run boilerplate:add
  ```

- Answer all the questions.

- Create changeset file and write a summary:

  ```sh
  pnpm run changeset
  ```

- Commit all the changes to GitHub.
- Open a pull request and wait for approval. All pull requests must be made to the `main` branch.

## CLI development

- You can start developing `create-boilertowns` locally by runing:

  ```sh
  pnpm run dev
  ```

- Create changeset file and write a summary:

  ```sh
  pnpm run changeset
  ```

- Commit your changes.
- Open a pull request and wait for approval. All pull requests must be made to the `main` branch.