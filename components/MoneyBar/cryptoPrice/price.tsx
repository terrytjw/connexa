import * as React from 'react';
import { useState, useEffect } from 'react';

const getPirce = async(stock) => {
  const link =
          'https://api.coingecko.com/api/v3/simple/price?ids=' + stock + '&vs_currencies=usd';
  const dic = await fetch(link, { method: 'GET' });
  var json = await dic.json();
  const data = json[s]['usd'];
        prices[j] = data 
  
      }
      return prices;
    } catch (error) {
      console.log(error);
    }
  }

export function showpriceactiontable(){
    const[price] = useState([]);

}