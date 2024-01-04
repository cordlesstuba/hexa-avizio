## Getting Started
First, run build the docker image
```bash
docker build -t hexa-avizio:latest .
```

Then, run the development server:

```bash
docker run -p 3000:3000 hexa-avizio:latest
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dependencies
FullCalendar [https://fullcalendar.io/](https://fullcalendar.io/) to magane calendar view
NextUI [https://nextui.org/](https://nextui.org/) to manage ui element such as modal or form