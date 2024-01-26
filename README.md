# saucedemo-cypress

## :notebook_with_decorative_cover: Saucedemo app + Cypress example :notebook_with_decorative_cover:
* TypeScript
* Page object pattern
* Desktop + mobile devices E2E paths
* GitHub Actions
* Mochawesome reporter

## :hammer: How to run :hammer:
1. Clone repository
2. Install packages with `npm install`
3. Start application with `npm run start`
4. Run cypress tests
   - `npm run e2e:all` (desktop & mobile)
   - `npm run e2e:desktop` (desktop)
   - `npm run e2e:medium` (medium device)
   - `npm run e2e:small` (small device)

## :computer: GitHub Actions :computer:
You can run all tests using GitHub Actions using `workflow_dispatch` event trigger. This event requires user input, based on which the desired script is triggered. Possible options include: all, desktop, medium, small

After execution test results will be stored as artifacts and will be available for next 90 days.

## :stop_sign: Environment variables :stop_sign:
Before running the tests locally, make sure you have added a file with the .env extension along with the environment variables provided below.

```
.env
CYPRESS_USERNAME=standard_user
CYPRESS_PASSWORD=secret_sauce
CYPRESS_LOCKER_USER=locked_out_user
CYPRESS_PROBLEM_USER=problem_user
CYPRESS_PERFORMANCE_GLITCH_USER=performance_glitch_user
```
