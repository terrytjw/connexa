import * as React from 'react';
import { useState, useEffect } from 'react';

const getPrice = async(stock) => {
  const link =
          'https://api.coingecko.com/api/v3/simple/price?ids=' + stock + '&vs_currencies=usd';
  const dic = await fetch(link, { method: 'GET' });
  var json = await dic.json();
  const data = json[stock]['usd'];
  return data;
  }

  export default getPrice