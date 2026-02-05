interface UserAccount {
  id: number;
  first_name: string;
  last_name: string;
}

export const userMock: UserAccount[] = [
  {
    id: 1,
    first_name: "Joana",
    last_name: "da Silva Oliveira",
  }
]