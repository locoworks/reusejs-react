type RenderEnv = "client" | "server";
type HandoffState = "pending" | "complete";

/**
 * Env
 *
 * A utility class that provides information about the rendering environment and handoff state.
 */
class Env {
  current: RenderEnv = this.detect();
  handoffState: HandoffState = "pending";
  currentId = 0;

  /**
   * Sets the rendering environment.
   *
   * @param {RenderEnv} env - The rendering environment to set.
   */
  set(env: RenderEnv): void {
    if (this.current === env) return;

    this.handoffState = "pending";
    this.currentId = 0;
    this.current = env;
  }

  /**
   * Resets the rendering environment to the detected value.
   */
  reset(): void {
    this.set(this.detect());
  }

  /**
   * Generates the next unique ID.
   *
   * @returns {number} - The next unique ID.
   */
  nextId(): number {
    return ++this.currentId;
  }

  /**
   * Checks if the current rendering environment is server-side.
   *
   * @returns {boolean} - `true` if the rendering environment is server-side, `false` otherwise.
   */
  get isServer(): boolean {
    return this.current === "server";
  }

  /**
   * Checks if the current rendering environment is client-side.
   *
   * @returns {boolean} - `true` if the rendering environment is client-side, `false` otherwise.
   */
  get isClient(): boolean {
    return this.current === "client";
  }

  /**
   * Detects the current rendering environment.
   *
   * @private
   * @returns {RenderEnv} - The detected rendering environment.
   */
  private detect(): RenderEnv {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return "server";
    }

    return "client";
  }

  /**
   * Marks the handoff state as complete.
   */
  handoff(): void {
    if (this.handoffState === "pending") {
      this.handoffState = "complete";
    }
  }

  /**
   * Checks if the handoff state is complete.
   *
   * @returns {boolean} - `true` if the handoff state is complete, `false` otherwise.
   */
  get isHandoffComplete(): boolean {
    return this.handoffState === "complete";
  }
}

/**
 * renderEnv
 *
 * An instance of the `Env` class representing the current rendering environment and handoff state.
 */
export let env = new Env();
