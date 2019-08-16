import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { Component } from 'react';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  async componentDidMount() {
    setInterval(async () => {

      fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState(prevState => ({
              items: [result, ...prevState.items]
            }))
          },
        )

    }, 60000)

  }

  getFloatValue(key) {
    return parseFloat(key.replace(/,/g, ""));
  }
  

  getCounter = () => {
    if (this.state.items.length>1) {
    
    var  key1=this.getFloatValue(this.state.items[0].bpi.USD.rate)
    var key2=this.getFloatValue(this.state.items[1].bpi.USD.rate)
    if (key1 === key2) {
      return 'trending_flat'
    }
    if (key1 > key2 ){
      return 'arrow_upward';
    }
    return 'arrow_downward';
  }
  else return 'trending_flat'
}

  render() {
    return (
      <Paper >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Bitcoin Price</b></TableCell>
              <TableCell><b>Increase/Decrease</b></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
         { this.state.items.length!==0 ?
              <TableRow  >
                <TableCell>
                  USD :{this.state.items[0].bpi.USD.rate}<br></br>
                  EUR : {this.state.items[0].bpi.EUR.rate}<br></br>
                  GBP: {this.state.items[0].bpi.GBP.rate}</TableCell>
                <TableCell >
                  <i className="material-icons"> {this.getCounter()}</i>
                </TableCell>
              </TableRow> : null
         }
            
          </TableBody>
        </Table>
      </Paper>

    )
  }
}
