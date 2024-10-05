"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [resetDisplay, setResetDisplay] = useState(false)

  const handleNumberClick = (num: string) => {
    if (resetDisplay) {
      setDisplay(num)
      setResetDisplay(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const handleOperationClick = (op: string) => {
    if (previousValue === null) {
      setPreviousValue(parseFloat(display))
    } else if (operation) {
      const result = calculate()
      setPreviousValue(result)
      setDisplay(result.toString())
    }
    setOperation(op)
    setResetDisplay(true)
  }

  const handleEqualsClick = () => {
    if (previousValue !== null && operation) {
      const result = calculate()
      setDisplay(result.toString())
      setPreviousValue(null)
      setOperation(null)
      setResetDisplay(true)
    }
  }

  const calculate = () => {
    const current = parseFloat(display)
    switch (operation) {
      case "+":
        return previousValue! + current
      case "-":
        return previousValue! - current
      case "×":
        return previousValue! * current
      case "÷":
        return previousValue! / current
      default:
        return current
    }
  }

  const handleClear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
  }

  const buttons = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "-",
    "0", ".", "=", "+"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-sky-300 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-sky-800 shadow-2xl rounded-3xl overflow-hidden transform perspective-1000 rotate-x-5">
        <CardHeader className="bg-blue-900 text-white p-6">
          <CardTitle className="text-[3.25rem] mt-4 mb-4 font-bold text-center">Calculator</CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-gradient-to-b from-blue-700 to-blue-800">
          <div className="bg-sky-200 p-4 rounded-xl mb-6 shadow-inner transform -rotate-x-3">
            <div className="text-right text-3xl font-bold text-sky-900 break-all h-12 flex items-center justify-end">
              {display}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {buttons.map((btn) => (
              <Button
                key={btn}
                onClick={() => {
                  if (btn === "=") handleEqualsClick()
                  else if (["+", "-", "×", "÷"].includes(btn)) handleOperationClick(btn)
                  else handleNumberClick(btn)
                }}
                className={`text-2xl font-bold h-16 rounded-xl transform transition-all duration-150 active:translate-y-1 active:shadow-inner ${
                  ["+", "-", "×", "÷", "="].includes(btn)
                    ? "bg-sky-400 hover:bg-sky-500 text-white shadow-md"
                    : "bg-sky-100 hover:bg-sky-200 text-sky-900 shadow-md"
                }`}
              >
                {btn}
              </Button>
            ))}
            <Button
              onClick={handleClear}
              className="col-span-4 bg-red-500 hover:bg-red-600 text-white text-2xl font-bold h-16 rounded-xl transform transition-all duration-150 active:translate-y-1 active:shadow-inner shadow-md"
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
