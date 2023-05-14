const form = document.querySelector('.quiz-form')
const scoreInfo = document.querySelector('#scoreDetails')
const scoreLabel = document.querySelector('#scoreLabel')
const scoreSummary = document.querySelector('#scoreSummary')

const correctAnswers = ['A', 'C', 'D', 'D', 'B']

const writeInScoreInfo = ({label, summary}) => {
   scoreLabel.innerHTML = label
   scoreSummary.innerHTML = summary
}

const hideOrShowScoreInfo = () => {
   if(scoreInfo.style.display === 'block') {
      scoreInfo.style.display = 'none'
      return
   }

   scoreInfo.style.display = 'block'
}

const handleSubmitInForm = (event) => {
   event.preventDefault()

   const formElements = Array.from(form)
   const userAnswers = []
   let score = 0

   const storeChosenAnswer = element => {
      if(element.checked === true) {
         userAnswers.push(element.value)
      }
   }

   formElements.forEach(storeChosenAnswer)

   const checkCorrectAnswers = (answer, index) => {
      if(answer === correctAnswers[index]) {
         score += 100 / correctAnswers.length
      }
   }

   userAnswers.forEach(checkCorrectAnswers)

   const positiveScoreDetails = {
      label: 'Parabens!',
      summary: `<p>Sua pontuação final foi: ${score}!</p> <p> É um grande São Paulino</p>`
   }

   const negativeScoreDetails = {
      label: 'Não foi dessa vez!',
      summary: `<p>Sua pontuação final foi: ${score}.</p> <p> Tente responder o Quiz novamente.</p>`
   }

   if(score >= 50) {
      writeInScoreInfo(positiveScoreDetails)
      hideOrShowScoreInfo()
   }

   if(score < 50) {
      writeInScoreInfo(negativeScoreDetails)
      hideOrShowScoreInfo()
   }
}

const handleClickInModal = (event) => {
   const typesClassNames = [
      'modal',
      'btn-close',
   ]

   if(typesClassNames.includes(event.target.className)) {
      hideOrShowScoreInfo()
   }
}

form.addEventListener('submit', handleSubmitInForm)
scoreInfo.addEventListener('click', handleClickInModal)
