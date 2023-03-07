import { useState } from 'react'
import { Summary } from 'Components'
import AgeStep from './AgeStep'
import EmailStep from './EmailStep'
import { ProductIds } from 'Config/productIds'


const PRODUCT_IDS_TO_NAMES = {
  [ProductIds.devIns]: 'Developer Insurance',
}

const BuyFlow = () => {
  const [currentStep, setStep] = useState('email')
  const [collectedData, updateData] = useState({
    email: '',
    age: 0,
  })
  const getStepCallback = (nextStep: string) => (field: string, value: any) => {
    updateData({ ...collectedData, [field]: value })
    setStep(nextStep)
  }
  return (
    <>
      <h4>Buying {PRODUCT_IDS_TO_NAMES[ProductIds.devIns]}</h4>
      {(currentStep === 'email' && <EmailStep cb={getStepCallback('age')} />) ||
        (currentStep === 'age' && (
          <AgeStep cb={getStepCallback('summary')} />
        )) ||
        (currentStep === 'summary' && (
          <Summary
            collectedData={collectedData}
            purchaseType={ProductIds.devIns}
          />
        ))}
    </>
  )
}

export default BuyFlow
