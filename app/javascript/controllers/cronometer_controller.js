import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="cronometer"
export default class extends Controller {
  static targets = [
    "display",
    "start",
    "pause",
    "resume",
    "finish",
    "input"
  ]

  connect() {
    const savedSeconds = localStorage.getItem("cronometer_seconds")
    const savedStatus = localStorage.getItem("cronometer_status")

    this.seconds = savedSeconds ? parseInt(savedSeconds) : 0
    this.updateDisplay()

    if (savedStatus == "running") {
      this.start()
    } else if (savedStatus === "paused" && this.seconds > 0) {
      this.showPausedUI()
    }
  }

  disconnect() {
    this.stopTimer()
  }

  start() {
    if (this.interval) return

    this.showRunningUI()
    localStorage.setItem("cronometer_status", "running")

    this.interval = setInterval(() => {
      this.seconds++
      this.updateDisplay()
      localStorage.setItem("cronometer_seconds", this.seconds)
    }, 1000)
  }

  pause() {
    this.stopTimer()
    localStorage.setItem("cronometer_status", "paused")
    this.showPausedUI()
  }

  stopTimer() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  resume() {
    this.start()
  }

  finish() {
    this.stopTimer()

    this.inputTarget.value = this.seconds
    this.seconds = 0

    localStorage.setItem("cronometer_seconds", 0)
    localStorage.setItem("cronometer_status", "paused")

    this.updateDisplay()
    this.showInitialUI()
  }

  updateDisplay() {
    let hours = Math.floor(this.seconds / 3600).toString().padStart(2, "0")
    let minutes = Math.floor((this.seconds % 3600) / 60).toString().padStart(2, "0")
    let seconds = (this.seconds % 60).toString().padStart(2, "0")
    let formattedTime = `${hours}:${minutes}:${seconds}`
    this.displayTarget.textContent = formattedTime
  }

  showRunningUI() {
    this.startTarget.classList.add("hidden")
    this.pauseTarget.classList.remove("hidden")
    this.resumeTarget.classList.add("hidden")
    this.finishTarget.classList.add("hidden")
  }

  showPausedUI() {
    this.startTarget.classList.add("hidden")
    this.pauseTarget.classList.add("hidden")
    this.resumeTarget.classList.remove("hidden")
    this.finishTarget.classList.remove("hidden")
  }

  showInitialUI() {
    this.startTarget.classList.remove("hidden")
    this.pauseTarget.classList.add("hidden")
    this.resumeTarget.classList.add("hidden")
    this.finishTarget.classList.add("hidden")
  }
}
