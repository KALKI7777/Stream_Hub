"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DollarSign, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"

interface DonationModalProps {
  streamer: string
  onClose: () => void
}

export default function DonationModal({ streamer, onClose }: DonationModalProps) {
  const [amount, setAmount] = useState("5")
  const [customAmount, setCustomAmount] = useState("")
  const [message, setMessage] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleDonate = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)

      // Close modal after showing success message
      setTimeout(() => {
        onClose()
      }, 3000)
    }, 2000)
  }

  const finalAmount = amount === "custom" ? customAmount : amount
  const isValidAmount =
    amount !== "custom" || (customAmount !== "" && !isNaN(Number(customAmount)) && Number(customAmount) > 0)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-0 bg-gradient-to-br from-indigo-800/90 to-purple-900/90 backdrop-blur-sm text-white shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-white">
            <DollarSign className="h-5 w-5 mr-2 text-pink-400" />
            Support {streamer}
          </DialogTitle>
          <DialogDescription className="text-indigo-200">
            Your donation helps the streamer create more content.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <motion.div
            className="py-6 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 mb-4">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-medium text-white">Donation Successful!</h3>
            <p className="mt-2 text-indigo-200">
              Thank you for supporting {streamer} with ${finalAmount}!
            </p>
          </motion.div>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              <RadioGroup value={amount} onValueChange={setAmount} className="grid grid-cols-4 gap-2">
                <div>
                  <RadioGroupItem value="5" id="amount-5" className="sr-only" />
                  <Label
                    htmlFor="amount-5"
                    className={`flex h-12 items-center justify-center rounded-md border ${
                      amount === "5"
                        ? "bg-gradient-to-r from-pink-500 to-indigo-600 border-transparent text-white"
                        : "border-indigo-600 bg-indigo-900/50 text-white"
                    } cursor-pointer text-sm font-medium transition-all duration-200 hover:bg-indigo-800/50`}
                  >
                    $5
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="10" id="amount-10" className="sr-only" />
                  <Label
                    htmlFor="amount-10"
                    className={`flex h-12 items-center justify-center rounded-md border ${
                      amount === "10"
                        ? "bg-gradient-to-r from-pink-500 to-indigo-600 border-transparent text-white"
                        : "border-indigo-600 bg-indigo-900/50 text-white"
                    } cursor-pointer text-sm font-medium transition-all duration-200 hover:bg-indigo-800/50`}
                  >
                    $10
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="25" id="amount-25" className="sr-only" />
                  <Label
                    htmlFor="amount-25"
                    className={`flex h-12 items-center justify-center rounded-md border ${
                      amount === "25"
                        ? "bg-gradient-to-r from-pink-500 to-indigo-600 border-transparent text-white"
                        : "border-indigo-600 bg-indigo-900/50 text-white"
                    } cursor-pointer text-sm font-medium transition-all duration-200 hover:bg-indigo-800/50`}
                  >
                    $25
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="custom" id="amount-custom" className="sr-only" />
                  <Label
                    htmlFor="amount-custom"
                    className={`flex h-12 items-center justify-center rounded-md border ${
                      amount === "custom"
                        ? "bg-gradient-to-r from-pink-500 to-indigo-600 border-transparent text-white"
                        : "border-indigo-600 bg-indigo-900/50 text-white"
                    } cursor-pointer text-sm font-medium transition-all duration-200 hover:bg-indigo-800/50`}
                  >
                    Custom
                  </Label>
                </div>
              </RadioGroup>

              {amount === "custom" && (
                <motion.div
                  className="space-y-2"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="custom-amount" className="text-indigo-100">
                    Custom Amount ($)
                  </Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="bg-indigo-950/50 border-indigo-700 text-white placeholder:text-indigo-400 focus:ring-pink-500 focus:border-pink-500"
                  />
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="message" className="text-indigo-100">
                  Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Add a message to your donation"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="bg-indigo-950/50 border-indigo-700 text-white placeholder:text-indigo-400 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>

              <Alert className="bg-indigo-950/70 border-indigo-700">
                <AlertCircle className="h-4 w-4 text-pink-500" />
                <AlertDescription className="text-indigo-200">
                  Your donation will be displayed on stream.
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter>
              <Button
                onClick={handleDonate}
                disabled={isProcessing || !isValidAmount}
                className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 border-0 text-white"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin mr-2">⟳</span> Processing...
                  </>
                ) : (
                  `Donate $${finalAmount || "0"}`
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

