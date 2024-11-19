<script lang="ts">
  import SevenSegment from "../lib/SevenSegment.svelte";

  const NUM_DIGITS = 6;

  let targetNumber: number[] = $state([]);
  let playerSegments: number[][] = $state([]);
  let gameWon = $state(false);

  let startTime: number;
  let elapsedTime: number = $state(0);
  let timerInterval: ReturnType<typeof setInterval>;

  function generateRandomNumber(): number[] {
    return Array(NUM_DIGITS)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10));
  }

  function createEmptySegments(): number[][] {
    return Array(NUM_DIGITS)
      .fill(null)
      .map(() => Array(7).fill(0));
  }

  function startNewGame() {
    targetNumber = generateRandomNumber();
    playerSegments = createEmptySegments();
    gameWon = false;
    startTime = Date.now();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      elapsedTime = (Date.now() - startTime) / 1000;
    }, 16);
  }

  function handleSegmentClick(segmentIndex: number, digitIndex: number) {
    if (gameWon) return;

    const newSegments = playerSegments.map((digit) => [...digit]);
    newSegments[digitIndex] = [...newSegments[digitIndex]];
    newSegments[digitIndex][segmentIndex] = Number(
      !newSegments[digitIndex][segmentIndex]
    );
    playerSegments = newSegments;

    checkWin();
  }

  function getDigitFromSegments(segments: number[]): string {
    const segmentStr = segments.join("");
    for (let i = 0; i < patterns.length; i++) {
      if (patterns[i].join("") === segmentStr) {
        return i.toString();
      }
    }
    return "x";
  }

  function checkWin() {
    const currentNumbers = playerSegments.map((segments) =>
      getDigitFromSegments(segments)
    );
    if (
      currentNumbers.every((val, idx) => val === targetNumber[idx].toString())
    ) {
      gameWon = true;
      clearInterval(timerInterval);
    }
  }

  const patterns = [
    [1, 1, 1, 0, 1, 1, 1], // 0
    [0, 0, 1, 0, 0, 1, 0], // 1
    [1, 0, 1, 1, 1, 0, 1], // 2
    [1, 0, 1, 1, 0, 1, 1], // 3
    [0, 1, 1, 1, 0, 1, 0], // 4
    [1, 1, 0, 1, 0, 1, 1], // 5
    [1, 1, 0, 1, 1, 1, 1], // 6
    [1, 0, 1, 0, 0, 1, 0], // 7
    [1, 1, 1, 1, 1, 1, 1], // 8
    [1, 1, 1, 1, 0, 1, 1], // 9
  ];

  startNewGame();

  let targetNumberString = $derived(targetNumber.join(""));
  let currentNumberString = $derived(
    playerSegments.map((segments) => getDigitFromSegments(segments)).join("")
  );
</script>

<main>
  <h1>Seven Segment</h1>

  <div class="game-container">
    <div class="target-number">
      <h2>Target Number:</h2>
      <div class="number">{targetNumberString}</div>
    </div>

    <div class="display-wrapper">
      <h2>
        Your Display: <span class="current-number">{currentNumberString}</span>
      </h2>
      <div class="segments-container">
        <SevenSegment
          value={targetNumber}
          segments={playerSegments}
          interactive={!gameWon}
          onSegmentClick={handleSegmentClick}
        />
      </div>
    </div>
  </div>

  <div class="game-info">
    {#if gameWon}
      <p class="success">Congratulations! You won!</p>
      <p class="elapsed-time">Elapsed Time: {elapsedTime.toFixed(2)} seconds</p>
      <button onclick={startNewGame}>Play Again</button>
    {:else}
      <p class="instructions">
        Click on any segment to toggle it and try to match the target number
      </p>
    {/if}
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    min-height: 100vh;
  }

  .game-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin: 2rem 0;
  }

  .target-number {
    text-align: center;
  }

  .number {
    font-size: 5rem;
    font-weight: bold;
    color: #ff3e00;
    font-family: monospace;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    margin: 1rem 0;
  }

  .current-number {
    font-size: 2rem;
    font-weight: bold;
    color: #ff3e00;
    font-family: monospace;
  }

  .display-wrapper {
    text-align: center;
  }

  .segments-container {
    overflow-x: auto;
    padding: 1rem;
    max-width: 100vw;
  }

  .game-info {
    text-align: center;
    margin-top: 2rem;
  }

  .success {
    color: #4caf50;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .instructions {
    color: #888;
  }

  .elapsed-time {
    color: #4caf50;
    font-weight: bold;
    font-size: 1.2rem;
  }

  button {
    font-size: 1.2rem;
    padding: 0.8rem 1.6rem;
    background-color: #ff3e00;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #ff5722;
  }

  h2 {
    margin-bottom: 1rem;
    color: #666;
  }

  h1 {
    color: #333;
    margin-bottom: 1rem;
  }
</style>
