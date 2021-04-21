<h1 align="center">Welcome to Grocery Project 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/prettydevman" target="_blank">
    <img alt="Twitter: prettydevman" src="https://img.shields.io/twitter/follow/prettydevman.svg?style=social" />
  </a>
</p>

# Auction frontend

## **Features:**

- Next.js
- Ant Design
- Typescript
- GraphQL

## Solved Issues

### change default antd theme

#### https://dev.to/agmm/simple-way-of-modifying-ant-design-default-theme-3g4h

1.  yarn global add less
2.  cd node_modules/antd/dist
3.  create my-theme.less
4.  write custom styles like following

```
@import "./antd.less";   // Import Ant Design styles by less entry

@primary-color: #d228e9;                         // primary color for all components
@link-color: #1890ff;                            // link color
@success-color: #52c41a;                         // success state color
@warning-color: #faad14;                         // warning state color
@error-color: #f5222d;                           // error state color
@font-size-base: 40px;                           // major text font size
@heading-color: rgba(0, 0, 0, .85);              // heading text color
@text-color: rgba(0, 0, 0, .65);                 // major text color
@text-color-secondary : rgba(0, 0, 0, .45);      // secondary text color
@disabled-color : rgba(0, 0, 0, .25);            // disable state color
@border-radius-base: 4px;                        // major border radius
@border-color-base: #d9d9d9;                     // major border color
@box-shadow-base: 0 2px 8px rgba(0, 0, 0, .15);  // major shadow for layers
```

5.  lessc --js my-theme.less ../../../src/style/custom-antd.css

### cloudinary preset setting

#### https://res.cloudinary.com/orlyborly/video/upload/preset_configuration.mp4

### paypal sandbox account

sb-52jtf2210264@personal.example.com
LA>^,p10

### css animation reference

https://www.codesdope.com/blog/article/animate-your-website-elements-with-css-transforms/
https://codepen.io/Venerons/pen/BvHbK
https://codepen.io/MarioDesigns/pen/woJgeo

### pwa icon generator

https://cthedot.de/icongen/#output

https://www.pwabuilder.com/imageGenerator
