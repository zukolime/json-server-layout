export class UserService {
  async getData(url, options) {
    try {
      const res = await fetch(url, options);
      return await res.json();
    } catch (error) {
      console.log(`Oops: ${error.message}`);
      this.showError("Произошла ошибка, данных нет!");
    }
  }

  async sendData(url, method, data) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    };
    return await this.getData(url, options);
  }

  async getUsers() {
    return await this.getData("http://localhost:4545/users");
  }

  async addUser(user) {
    return await this.sendData("http://localhost:4545/users", "POST", user);
  }

  async removeUser(id) {
    return await this.sendData(`http://localhost:4545/users/${id}`, "DELETE");
  }

  async changeUser(id, data) {
    return await this.sendData(
      `http://localhost:4545/users/${id}`,
      "PATCH",
      data
    );
  }

  async getUser(id) {
    return await this.getData(`http://localhost:4545/users/${id}`);
  }

  async editUser(id, user) {
    return await this.sendData(
      `http://localhost:4545/users/${id}`,
      "PUT",
      user
    );
  }

  async filterUsers(filterOption) {
    return await this.getData(
      `http://localhost:4545/users?${filterOption}=true`
    );
  }

  async getSortUsers(sortOption) {
    return await this.getData(
      `http://localhost:4545/users?_sort=${sortOption.name}&_order=${sortOption.value}`
    );
  }

  async getSearchUsers(str) {
    return await this.getData(`http://localhost:4545/users?name_like=${str}`);
  }

  showError(message) {
    const table = document.querySelector(".table-responsive");
    const errorMessage = document.createElement("p");

    errorMessage.textContent = message;
    errorMessage.style.color = "red";
    errorMessage.style.textAlign = "center";
    table.append(errorMessage);
  }
}
