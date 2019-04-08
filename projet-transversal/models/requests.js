// getUsers() -> [{id, firstname, lastname, email}, ...]
// getUserById(id) -> {firstname, lastname, email}
// userExists(email, password) -> Bool
// connectUser(email, password)
// addUser(email, password) -> ()
// orderBox(id, user_id, adress, number, date)

// getBoxes() -> [{id, name, price, description}, ...]
// addBox(name, price, description) -> ()
// addFeedback(box_id, content, user_id)
// getFeedbacks(box_id) -> [[content, user_id], [content2, user_id], ...]
// addRecipe(name, steps, preparation, cook, difficulty) -> ()
// getRecipes() -> [{id, name, steps, preparation, cook, difficulty}, ...]
// getRecipeById(id) -> [{id, name, steps, preparation, cook, difficulty}, ...]
// addIngredientForRecipe(recipe_id, ingredient)

// getIngredientsForRecipe(id) -> [ingredient, ...]
// addToolForRecipe(recipe_id, tool)
// getToolsForRecipe(id) -> [tool, ...]

const mysql = require('mysql');
const passwordHash = require("password-hash");

  // Host	localhost
  // Port	8889
  // User	root
  // Password	root
  // Socket	/Applications/MAMP/tmp/mysql/mysql.sock
  
var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      port: "8889",
      database: "projetTransversal"
});

module.exports = {
    getUsers: () => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query("SELECT * FROM users",(err, result, fields) => {
                    if (err) reject(err);
                    return resolve(result);
                });
            });
        });
    },

    getUserById: (id) => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query(`SELECT * FROM users WHERE id_user=${id}`, (err, result, fields) => {
                    if (err) reject(err);
                    return resolve(result);
                });
            });
        });
    },

    connectUser: (email, password) => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query(`SELECT * FROM users WHERE email='${email}'`,(err, result, fields) => {
                    if (err) reject(err);
                    
                    if (result.length != 0)
                    {
                        if (!passwordHash.verify(password, result[0].password))
                        {
                            reject("Invalid password");
                        }
                        resolve("Connected");
                    }
                    else
                    {
                        reject("Email does not exist");
                    }
                });
            });
        });
    },

    addUser: (email, password) => {
        password = passwordHash.generate(password);

        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query(`INSERT INTO users (email, password) VALUES ('${email}', '${password}')`, (err, result, fields) => {
                    if (err) reject(err);
                    return resolve(result);
                });
            });
        });
    },

    orderBox: (user_id, box_id, adress, quantity) => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);

                var date_of_order = new Date();
                var dd = String(date_of_order.getDate()).padStart(2, '0');
                var mm = String(date_of_order.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = date_of_order.getFullYear();
                date_of_order = dd + '/' + mm + '/' + yyyy;

                var query = `INSERT INTO orders (status, user_id, box_id, adress, date_of_order, quantity) VALUES ('ordered', '${user_id}', '${box_id}', '${adress}', str_to_date('${date_of_order}', '%d/%m/%Y'), ${quantity})`
                con.query(query, (err, result, fields) => {
                    if (err) reject(err);
                    return resolve(result);
                });
            });
        });
    },

    getBoxes: () => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query("SELECT * FROM boxes",(err, result, fields) => {
                    if (err) reject(err);
                    return resolve(result);
                });
            });
        });
    },

    addBox: (name, price, description) => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query(`INSERT INTO boxes (name, price, description) VALUES ('${name}', ${price}, '${description}')`,(err, result, fields) => {
                    if (err) reject(err);
                    return resolve(result);
                });
            });
        });
    },

    addFeedback: (box_id, content, user_id) => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query(`INSERT INTO feedbacks (content, user_id, box_id) VALUES ('${content}', ${user_id}, '${box_id}')`,(err, result, fields) => {
                    if (err) reject(err);
                    return resolve(result);
                });
            });
        });
    },

    getFeedbacks: (box_id) => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query(`SELECT * FROM feedbacks WHERE box_id=${box_id}`,(err, result, fields) => {
                    if (err) reject(err);
                    return resolve(result);
                });
            });
        });
    },

    addRecipe: (name, steps, preparation, cook, difficulty) => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query(`INSERT INTO recipes (name, steps, preparation_time, cook_time, difficulty) VALUES ('${name}', ${steps}, '${preparation}', '${cook}', ${difficulty})`,(err, result, fields) => {
                    if (err) reject(err);
                    return resolve(result);
                });
            });
        });
    },

    getRecipes: () => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query(`SELECT * FROM recipes`,(err, result, fields) => {
                    if (err) reject(err);
                    return resolve(result);
                });
            });
        });
    },

    getRecipeById: (id) => {
        return new Promise((resolve, reject) => {
            con.connect((err) => {
                if (err) reject(err);
                con.query(`SELECT * FROM feedbacks WHERE id_recipe=${id}`,(err, result, fields) => {
                    if (err) reject(err);
                    return resolve(result);
                });
            });
        });
    }

    // addIngredientForRecipe: (recipe_id, ingredient_id) => {
    //     return new Promise((resolve, reject) => {
    //         con.connect((err) => {
    //             if (err) reject(err);
    //             con.query(`SELECT * FROM recipe_has_ingredients WHERE id_recipe=${id}`,(err, result, fields) => {
    //                 if (err) reject(err);
    //                 return resolve(result);
    //             });
    //         });
    //     });
    // }
}