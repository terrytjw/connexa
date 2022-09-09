import * as React from 'react';
import { useState, useEffect } from 'react';

async function price() {
    const assets_of_interest = [
      'bitcoin',
      'ethereum',
      'solana',
      'binancecoin',
    ];
    const prices = []
    try {
      for (let j = 0; j < assets_of_interest.length; j++) {
        const asset_name = assets_of_interest[j];
        const link =
          'https://api.coingecko.com/api/v3/simple/price?ids=' + asset_name + '&vs_currencies=usd';
        const dic = await fetch(link, { method: 'GET' });
        var json = await dic.json();
        const data = json[asset_name]['usd'];
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