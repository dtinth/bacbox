<script lang="ts">
  interface Props {
    value?: number[]
    segments?: number[][]
    interactive?: boolean
    onSegmentClick?: (segmentIndex: number, digitIndex: number) => void
  }

  let {
    value = [0, 0, 0, 0, 0, 0],
    segments = [],
    interactive = false,
    onSegmentClick = () => {},
  }: Props = $props()
</script>

<div class="display-container">
  {#each segments as digitSegments, digitIndex}
    <div class="seven-segment" class:interactive>
      {#each Array(7) as _, segmentIndex}
        <div
          class="segment {segmentIndex === 0 ||
          segmentIndex === 3 ||
          segmentIndex === 6
            ? 'horizontal'
            : 'vertical'}
                {segmentIndex === 3 ? 'middle' : ''}
                {segmentIndex === 6 ? 'bottom' : ''}
                {segmentIndex === 1 ? 'left-top' : ''}
                {segmentIndex === 2 ? 'right-top' : ''}
                {segmentIndex === 4 ? 'left-bottom' : ''}
                {segmentIndex === 5 ? 'right-bottom' : ''}"
          class:active={digitSegments[segmentIndex]}
          onclick={() =>
            interactive && onSegmentClick(segmentIndex, digitIndex)}
        ></div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .display-container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .seven-segment {
    position: relative;
    width: 80px;
    height: 140px;
  }

  .interactive .segment {
    cursor: pointer;
  }

  .interactive .segment:hover {
    opacity: 0.8;
    background-color: #666;
  }

  .interactive .segment.active:hover {
    background-color: #ff5722;
  }

  .segment {
    position: absolute;
    background-color: #333;
    transition: all 0.2s;
  }

  .segment.active {
    background-color: #ff3e00;
  }

  .horizontal {
    width: 50px;
    height: 8px;
    left: 15px;
  }

  .vertical {
    width: 8px;
    height: 55px;
  }

  /* Top */
  .horizontal:not(.middle):not(.bottom) {
    top: 0;
  }

  /* Middle */
  .middle {
    top: 66px;
  }

  /* Bottom */
  .bottom {
    bottom: 0;
  }

  /* Left segments */
  .left-top {
    top: 8px;
    left: 7px;
  }

  .left-bottom {
    bottom: 8px;
    left: 7px;
  }

  /* Right segments */
  .right-top {
    top: 8px;
    right: 7px;
  }

  .right-bottom {
    bottom: 8px;
    right: 7px;
  }
</style>
