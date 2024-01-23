import ViewportPreset = Cypress.ViewportPreset;

export const viewports = {
  small: [576, 960],
  medium: [992, 1280],
  desktop: [1920, 1080],
};

export function setViewport(viewport: ViewportPreset | number[]): void {
  !Cypress._.isArray(viewport)
    ? cy.viewport(viewport)
    : cy.viewport(viewport[0], viewport[1]);
}
