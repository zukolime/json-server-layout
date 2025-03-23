import { render } from "./render";

export const sortUsers = () => {
  const headerSortIsChildren = document.getElementById("sort-is-children");

  let isSort = false;

  headerSortIsChildren.style.cursor = "pointer";

  headerSortIsChildren.addEventListener("click", () => {
    userService
      .getSortUsers({
        name: "children",
        value: isSort ? "asc" : "desc",
      })
      .then((users) => {
        render(users);
      })
      .catch((error) => console.log(error.message));

    isSort = !isSort;
  });
};
