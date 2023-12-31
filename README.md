# General Information

This is an upgraded version of my react-stock-profile with cleaner code and responsive design.

Capable of grabbing data from all NASDAQ-100 and Dow Jones companies.

## Features

* Home Page - Displays popular tech companies at the moment, allowing the user to click on the cards and travel to the Quote Page
* Quote Page - Displays information on the stock price for a specific company, a candlestick chart, and news articles
* Indices Page - Displays the companies for either the NASDAQ-100 or Dow Jones

## What I Learned from this Project

* NextJS (Pages)
  * GetServerSideProps
  * GetStaticProps and GetStaticPaths
  * API Routes (Good for handling form input)
* TypeScript - Statically Typed JavaScript
  * Defining Interfaces for JSON response objects and props
* Bootstrap / React Bootstrap - Allows me to create responsive designs faster
  * Prebuilt components such as Card and Navbar
  * A bit inflexible, will try Tailwind next time
* CSS Modules - Allows me to organize my CSS
  * Better than using global CSS for all components and pages because of naming conventions
* Multi-page web design (through NextJS pages)
* Semantic HTML

## Languages

* HTML
* CSS
* TypeScript

## Libraries / Frameworks

* NextJS
* React Bootstrap

## Improvements for Next Project

* Will use Tailwind instead (allows for custom styles without the limitations of Bootstrap)
* Will consider the use client-side VS server-side rendering a bit more carefully
* Will use MERN (MongoDB, ExpressJS, React/Next, Node) development to create a backend

## TODO

* Create a chart using ApexCharts on the Quote Page
* Expand company list
* Create separate pages for DOW, S&P500, and NASDAQ (maybe descriptions)
