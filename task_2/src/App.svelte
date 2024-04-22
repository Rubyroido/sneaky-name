<script lang="ts">
  import { onMount } from "svelte";
  const URL = "https://open.er-api.com/v6/latest/";

  let firstCurrency: string, secondCurrensy: string;
  let firstInput: number = 0, secondInput: number = 0;
  let rates: object = {};

  onMount(() => {
    getCurrency("USD")
      .then((data) => {
        rates = data.rates;
      })
      .catch((err) => console.log(err));
  });

  function getCurrency(currency) {
    return fetch(`${URL}${currency}`, {
      method: "GET",
    }).then((res) => {
      return res.json();
    });
  }

  function handleCurrencyChange(e) {
    if(e.target.id === 'first-curr') {
      getCurrency(e.target.value)
      .then((data) => {
        rates = data.rates;
        convert(true, firstInput, secondCurrensy, rates)
      })
      .catch((err) => console.log(err));
    } else {
      // так при изменении второй валюты пересчитывается второй инпут исходя из значений первого
      // convert(true, firstInput, secondCurrensy, rates)
      // а так будет пересчитываться первый инпут исходя из значений второго
      convert(false, secondInput, secondCurrensy, rates)
    }
  }

  function convert(
    isFirstInput: boolean,
    sum: number,
    curr: string,
    rates: object,
  ) {
    if (isFirstInput) {
      secondInput = Number((sum * rates[curr]).toFixed(4));
      return
    } else {
      firstInput = Number((sum / rates[curr]).toFixed(4));
    }
  }
</script>

<main>
  <div class="converter">
    <div class="first-container">
      <select
        name="curr"
        id="first-curr"
        bind:value={firstCurrency}
        on:change={handleCurrencyChange}
      >
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
        <option value="EUR">EUR</option>
        <option value="RUB">RUB</option>
        <option value="CNY">CNY</option>
      </select>
      <input
        type="number"
        bind:value={firstInput}
        on:input={() => convert(true, firstInput, secondCurrensy, rates)}
      />
    </div>
    <div class="second-container">
      <select
        name="curr"
        id="second-curr"
        bind:value={secondCurrensy}
        on:change={handleCurrencyChange}
      >
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
        <option value="EUR">EUR</option>
        <option value="RUB">RUB</option>
        <option value="CNY">CNY</option>
      </select>
      <input
        type="number"
        bind:value={secondInput}
        on:input={() => convert(false, secondInput, secondCurrensy, rates)}
      />
    </div>
  </div>
  <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
</main>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
