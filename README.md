# 360dent – strona WWW gabinetu stomatologicznego

Jednostronicowa (one-page) strona internetowa przygotowana w czystym HTML, CSS i vanilla JavaScript, gotowa do wdrożenia na **Cloudflare Pages**.

## Struktura projektu

```txt
360dent/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   └── images/
│       └── logo-placeholder.svg
└── README.md
```

## Uruchomienie lokalne

1. Sklonuj repozytorium.
2. Otwórz plik `index.html` bezpośrednio w przeglądarce lub uruchom prosty serwer statyczny (np. VS Code Live Server).

---

## Wdrożenie na Cloudflare Pages

1. Zaloguj się do panelu Cloudflare i przejdź do **Workers & Pages**.
2. Kliknij **Create application** → **Pages** → **Connect to Git**.
3. Połącz konto GitHub/GitLab i wybierz repozytorium z projektem `360dent`.
4. Ustaw konfigurację buildu:
   - **Framework preset**: `None`
   - **Build command**: *(zostaw puste)*
   - **Build output directory**: `/` lub `.`
5. Kliknij **Save and Deploy**.
6. Po kilku chwilach strona będzie dostępna pod adresem `*.pages.dev`.

---

## Ustawienie własnej domeny (360dent) w Cloudflare

1. W projekcie Cloudflare Pages przejdź do zakładki **Custom domains**.
2. Kliknij **Set up a custom domain**.
3. Wpisz domenę, np. `360dent.pl` lub subdomenę `www.360dent.pl`.
4. Potwierdź dodanie domeny – Cloudflare automatycznie doda wymagane rekordy, jeśli domena jest już zarządzana w Cloudflare DNS.

---

## Konfiguracja DNS dla domeny wykupionej zewnętrznie

Jeśli domena została kupiona u innego operatora (np. OVH, home.pl, GoDaddy), masz dwie ścieżki:

### Opcja A (zalecana): delegacja DNS do Cloudflare

1. Dodaj domenę w Cloudflare (Add a Site).
2. Cloudflare pokaże parę serwerów nazw (nameservers).
3. W panelu rejestratora domeny podmień aktualne nameservery na te od Cloudflare.
4. Po propagacji (zwykle od kilku minut do 24h) zarządzaj rekordami DNS już w Cloudflare.
5. Następnie dodaj domenę do Cloudflare Pages (sekcja **Custom domains**).

### Opcja B: pozostawienie DNS u zewnętrznego operatora

1. W Cloudflare Pages dodaj domenę niestandardową.
2. Cloudflare wyświetli rekord CNAME/A do ustawienia.
3. W panelu DNS zewnętrznego operatora dodaj wymagany rekord:
   - zwykle `CNAME` dla `www` wskazujący na adres projektu `*.pages.dev`
   - oraz ewentualny rekord dla domeny głównej (`@`) wg instrukcji Cloudflare.
4. Poczekaj na propagację DNS.
5. Zweryfikuj status domeny w panelu Cloudflare Pages.

---

## Uwagi

- `assets/images/logo-placeholder.svg` to placeholder logo – podmień na docelowy plik SVG/PNG.
- Formularz kontaktowy zawiera walidację po stronie klienta (demo) i nie wysyła danych na serwer.
- Przed produkcją uzupełnij treści oznaczone komentarzem `<!-- TODO: uzupełnić treść -->`.
