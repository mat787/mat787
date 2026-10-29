# Portfolio Matyldy Drapich

Responsywne portfolio analityczki danych zbudowane w Vite i czystym JavaScript. Zawiera projekty Data/ML, doświadczenie, podglądy analiz, dostępny niestandardowy kursor, opcjonalne dźwięki interfejsu oraz obsługę ograniczenia animacji.

## Edycja treści

Główne dane, linki, umiejętności i projekty znajdują się w obiekcie `content` na początku [`src/main.js`](./src/main.js).

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Wersję produkcyjną tworzy polecenie `npm run build`.

## Publikacja

Workflow `.github/workflows/deploy-pages.yml` buduje i publikuje stronę po zmianach na `main`. W ustawieniach repozytorium należy wybrać **Pages → Build and deployment → Source → GitHub Actions**.

Grafiki projektów pochodzą z własnych repozytoriów Matyldy, a dźwięki są generowane lokalnie w przeglądarce.
