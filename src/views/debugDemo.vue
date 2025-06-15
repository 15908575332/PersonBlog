<template>
  <div id="container">
    <a href="#nogo" class="button05">Login ►</a>
    <a href="#nogo" class="button05">Register ♥</a>
  </div>
</template>
<style lang="scss">
/***********************button05*****************************/

.button05 {
  position: relative;

  display: inline-block;

  min-width: 150px;

  padding: 10px 15px;

  margin: 0px 10px;

  background-color: #3e9ed6;

  background-image: -webkit-gradient(
    linear,
    left top,

    left bottom,

    color-stop(0, rgb(112, 181, 242)),
    color-stop(0.49, rgb(84, 164, 238)),
    color-stop(0.5, rgb(54, 144, 240)),
    color-stop(1, rgb(26, 97, 219))
  );

  background-image: -moz-linear-gradient(
    center top,

    rgb(112, 181, 242) 0%,

    rgb(84, 164, 238) 49%,

    rgb(54, 144, 240) 50%,

    rgb(26, 97, 219) 100%
  );

  color: #fff;

  font-weight: bold;

  font-size: 24px;

  text-decoration: none;

  text-align: center;

  line-height: 1;

  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.5);

  border: 1px solid;

  border-color: #2f71a3 #265a82 #1e4766 #265a82;

  border-radius: 8px;

  -moz-border-radius: 8px;

  -webkit-border-radius: 8px;

  box-shadow: inset 0px -4px 5px rgba(255, 255, 255, 0.2),
    inset 0px 1px 5px rgba(255, 255, 255, 0.2), /**/ 0px 2px 0px #1e4766,
    0px 4px 0px #1e4766, 0px 6px 0px #1e4766,
    /**/ 0px 8px 5px rgba(0, 0, 0, 0.5);

  -moz-box-shadow: inset 0px -4px 5px rgba(255, 255, 255, 0.2),
    inset 0px 1px 5px rgba(255, 255, 255, 0.2), /**/ 0px 2px 0px #1e4766,
    0px 4px 0px #1e4766, 0px 6px 0px #1e4766,
    /**/ 0px 8px 5px rgba(0, 0, 0, 0.5);

  -webkit-box-shadow: inset 0px -4px 5px rgba(255, 255, 255, 0.2),
    inset 0px 1px 5px rgba(255, 255, 255, 0.2), /**/ 0px 2px 0px #1e4766,
    0px 4px 0px #1e4766, 0px 6px 0px #1e4766,
    /**/ 0px 8px 5px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: #8ac5fd;

    background-image: -webkit-gradient(
      linear,
      left top,

      left bottom,

      color-stop(0, rgb(134, 193, 253)),
      color-stop(0.49, rgb(153, 213, 255)),
      color-stop(0.5, rgb(130, 194, 253)),
      color-stop(1, rgb(108, 170, 229))
    );

    background-image: -moz-linear-gradient(
      center top,

      rgb(134, 193, 253) 0%,

      rgb(153, 213, 255) 49%,

      rgb(130, 194, 253) 50%,

      rgb(108, 170, 229) 100%
    );
  }

  &:active {
    top: 4px;

    box-shadow: inset 0px 4px 5px rgba(255, 255, 255, 0.4),
      inset 0px -1px 5px rgba(255, 255, 255, 0.2), /**/ 0px 2px 0px #1e4766,
      /**/ 0px 4px 5px rgba(0, 0, 0, 0.5);

    -moz-box-shadow: inset 0px 4px 5px rgba(255, 255, 255, 0.4),
      inset 0px -1px 5px rgba(255, 255, 255, 0.2), /**/ 0px 2px 0px #1e4766,
      /**/ 0px 4px 5px rgba(0, 0, 0, 0.5);

    -webkit-box-shadow: inset 0px 4px 5px rgba(255, 255, 255, 0.4),
      inset 0px -1px 5px rgba(255, 255, 255, 0.2), /**/ 0px 2px 0px #1e4766,
      /**/ 0px 4px 5px rgba(0, 0, 0, 0.5);
  }
}
a {
  transition-duration: 0.4s, 0.5s;

  transition-property: background-color, color;

  transition-timing-function: ease, ease;
  &:hover {
    color: #0088cc;

    text-decoration: underline;
  }
}
</style>
