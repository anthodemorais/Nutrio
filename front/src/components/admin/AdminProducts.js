import React, { Component } from 'react';
import api from '../../services/api';

class AdminProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            name: "",
            description: "",
            price: "",
            img_name: ""
        }
        this.getProducts();
    }

    getProducts() {
        api.getProducts().then((products) => {
            console.log(products);
            this.setState({products: products});
        })
    }

    deleteProduct(e) {
        api.deleteProduct(e.target.id).then(console.log);
    }

    inputChanged(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit(e) {
        e.preventDefault();
    }

    render() {

        if (localStorage.getItem("admin") === "0" || localStorage.getItem("admin") === null) return (<span className="container">Vous n'êtes pas autorisé</span>)

        return (
            <div className="container">
                <h2>Ajouter un produit</h2>
                <form onSubmit={(e) => {this.submit(e)}}>
                    <label for="name">Nom du produit: <br/><input type="text" name="name" onChange={e => this.inputChanged(e)} /></label>
                    <label for="description">Description: <br/><textarea name="description" onChange={e => this.inputChanged(e)}></textarea></label>
                    <label for="price">Prix: <br/><input type="text" name="price" onChange={e => this.inputChanged(e)} /></label>
                    <label for="img_name">Image: <br/><input type="text" name="img_name" onChange={e => this.inputChanged(e)} /></label>
                </form>
                <h2>Liste des produits</h2>
                <table>
                    <tr>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Prix</th>
                    </tr>
                {this.state.products.map((product) => (
                    <tr key={product.id_box}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}€</td>
                        <td><button onClick={(e) => this.deleteProduct(e)} id={product.id_box}>Supprimer</button></td>
                        <td><button onClick={(e) => this.updateProduct(e)} id={product.id_box}>Modifier</button></td>
                    </tr>   
                ))}
                </table>
            </div>
        );
    }
}
 
export default AdminProducts;