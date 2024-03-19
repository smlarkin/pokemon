# Pokémon App

## Overview

The design decision for this app was to use the standard React Native library and primitives with no setup or extra tooling. As I'm used to using TypeScript and all the modern libraries that Expo and the React Native Community provide, it was a fun challenge to go back to the JS basics without the use of types for guidance.

## Added Features

I added pagination with an infinite scroll list using a `usePokemonData` hook. There is also an on-the-fly search feature that filters the list of Pokémon as you type, which uses both the `useSearchText` and `useDebounce` hooks.

I elected to use a modal for the Pokémon Details screen, which felt like the simplest and most elegant way to show the details without having to use a navigation library like React Navigation or Expo Router.

Also, I removed all dependencies from the `package.json`. Basically, the `@expo/vector-icons` were not appearing on the web, and I wanted to make sure all functionality worked in Snack on the web too.

## Gotchas / Nitpicks

Although I do log network errors, I did not set up any error handling in `fetch`. Usually, a message would be surfaced to the user through a toast, but this would require a library since toasts are only supported on Android out of the box.

Additionally, I elected to use the simple `useState` hook for all global state. This doesn't work for persisting state across app restarts, but it was the simplest way to manage state for this app. And using the Context API with or without a `useReducer` hook felt like overkill since I am only creating or mutating a single field on a single object in a list. Perhaps, if we added more actions to update the Pokémon Details, it would be worth it to use a reducer.

## Possible Improvements

Aside from adding error handling with toasts, there are some performance benefits to be gained by adopting signals for state management over the `useState` hook. This might allow for more granular control over re-renders and would be a good way to manage the list of Pokémon. The app is probably not complex enough to warrant profiling, but it can be fun to look into performance as we add features.

Also, if this were a real production app, I would definitely add a lot of automated tests using libraries like Jest and React Testing Library, or my personal favorite, Maestro.

Finally, this could be a really fun project to add animations and "delightful design" elements. I chose to focus on function over form to get a well-built app out the door. However, there is a lot of room for design improvements and the this app's design aesthetic should probably be more playful and dynamic to fit the content. Maybe adding drag-and-drop ordering to the list with grunt sounds and haptic feedback would be fun for Pokémon fans?

## Closing Thoughts

I had fun making this Pokêmon app and would be happy to answer any questions about the code or the design decisions I made along the way. Hope you enjoy the app, and I look forward to hearing your feedback. Cheers!
