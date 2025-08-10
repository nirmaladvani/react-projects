/* eslint-disable no-unused-vars */
import './App.css'
import RandomColor from './components/random-color'
import TabTest from './components/custom-tabs/tabs-test'
import ModalPopup from './components/modal-popup'
import LightDarkMode from './components/light-dark-mode'
import Accordion from './components/accordion'
import StarRating from './components/star-rating'
import QrCodeGenerator from './components/qr-code-generator'
import GitHubProfileFinder from './components/github-profile-finder'
import SearchAutoComplete from './components/search-autocomplete'
import TicTacToe from './components/tic-tac-toe'
import ImageSlider from './components/image-slider'
import LoadMoreData from './components/load-more-data'
import { useState, useEffect } from 'react'
import PasswordValidator from './components/password-validator/password-validator'
import Quiz from './components/quiz/quiz'

function App() {
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollPercentage, setScrollPercentage] = useState(0)

  function handleScrollTop() {}

  function handleScrollPercentage() {
    setScrollPercentage(
      (document.documentElement.scrollTop /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight)) *
        100
    )
    // console.log(document.documentElement.scrollTop)

    console.log(scrollPercentage)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScrollPercentage)

    return () => {
      window.removeEventListener('scroll', () => {})
    }
  }, [])

  return (
    <>
      {/* <Quiz /> */}

      <RandomColor />
      <Accordion />
      <TabTest />
      <ModalPopup />
      <LightDarkMode />
      <ImageSlider
        url={'https://picsum.photos/v2/list'}
        page={'1'}
        limit={'10'}
      />
      <LoadMoreData />
      <QrCodeGenerator />
      <GitHubProfileFinder />
      <SearchAutoComplete />
      <StarRating noOfStars={5} />
      <TicTacToe />
      <PasswordValidator />
      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
      >
        Jump to Top
      </button>
    </>
  )
}

export default App
