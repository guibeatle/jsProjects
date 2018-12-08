import React, { Component } from "react";

import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Jumbotron,
  FormGroup,
  Input,
  Col
} from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: null,
      listaEstados: [
        {
          nome: "",
          geocodigo: null
        }
      ],
      listaCidades: [
        {
          nome: "",
          geocodigo: null,
          uf_geocodigo: null,
          uf_id: null
        }
      ],
      estadoSelecionado: {
        nome: "",
        geocodigo: null
      },
      cidadeSelecionada: {
        nome: "",
        geocodigo: null,
        uf_geocodigo: null,
        uf_id: null
      },
      newCityName: ""
    };
  }
  getlistaEstados = () => {
    fetch("/api/estados")
      .then(res => res.json())
      .then(res => {
        var listaEstados = res.map(r => r);
        this.setState({ listaEstados });
      });
  };

  getlistaCidades = () => {
    fetch("/api/cidades")
      .then(res => res.json())
      .then(res => {
        var listaCidades = res.map(r => r);
        this.setState({ listaCidades });
      });
  };
  getlistaCidadesPorEstado = nome => {
    fetch(`/api/cidades/${nome}`)
      .then(res => res.json())
      .then(res => {
        var listaCidades = res.map(r => r);
        this.setState({ listaCidades });
        console.log(listaCidades);
      });
  };

  handleInputChange = e => {
    this.setState({ newCityName: e.target.value });
  };

  handleAddCity = () => {
    fetch("/api/cities", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: this.state.newCityName })
    })
      .then(res => res.json())
      .then(res => {
        this.getlistaEstados();
        this.setState({ newCityName: "" });
      });
  };

  handleChangeEstado = e => {
    console.log(e.target.value);
    //this.setState({ estadoSelecionado: e.target.value });
    this.getlistaCidadesPorEstado(e.target.value);
    //console.log(this.estadoSelecionado.geocodigo);
  };

  handleChangeCidade = e => {
    console.log(e.target.value);
    //this.listaCidades.setState(
    //this.getlistaCidadesPorEstado(this.estadoSelecionado)
    //);
    //this.cidadeSelecionada.setState({ e });
    //console.log(cidadeSelecionada.geocodigo);
  };

  componentDidMount() {
    this.getlistaEstados();
    //this.getlistaCidades();
  }

  render() {
    return (
      <Container fluid className="centered">
        <Navbar dark color="dark">
          <NavbarBrand href="/">SisArq</NavbarBrand>
        </Navbar>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">SisArq</h1>
              <p className="lead">Opa</p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-5">Estados</h1>
            <FormGroup>
              <Input type="select" onChange={this.handleChangeEstado}>
                {this.state.listaEstados.length === 0 && (
                  <option>Nenhum estado selecionado.</option>
                )}
                {this.state.listaEstados.length > 0 && (
                  <option>Selecione um estado</option>
                )}
                {this.state.listaEstados.map((estados, i) => (
                  <option key={i}>{estados.nome}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="display-6">Cidades</h1>
            <FormGroup>
              <Input type="select" onChange={this.handleChangeCidade}>
                >
                {this.state.listaCidades.length === 0 && (
                  <option>Nenhuma cidade adicionada.</option>
                )}
                {this.state.listaCidades.length > 0 && (
                  <option>Selecione uma cidade</option>
                )}
                {this.state.listaCidades.map((cidades, i) => (
                  <option key={i}>{cidades.nme_mun}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
