import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

const userTestimonials = [
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: 'Remy Sharp',
    occupation: 'Restaurant Owner',
    testimonial:
      "I'm thoroughly impressed by the versatility of this product! Whether I'm managing the operations of my hotel or fine-tuning the dining experience at my restaurant, it effortlessly adapts to my evolving needs. Its intuitive interface has significantly improved my daily workflow, making tasks not only more efficient but also more enjoyable.",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
    name: 'Travis Howard',
    occupation: 'Restaurant Owner',
    testimonial:
      "As a hotel or restaurant owner, I've found the exceptional customer support provided by this product to be invaluable. The team behind this product has been quick to respond and incredibly helpful whenever we've needed assistance. It's reassuring to know that they stand firmly behind their product, ensuring that our needs are met and our guests' experiences are enhanced.",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
    name: 'Cindy Baker',
    occupation: 'Restaurant Managers',
    testimonial:
      "As a seasoned hotel/restaurant owner, I can confidently say that this product has been a game-changer for our establishment. Its robust features have streamlined our feedback analysis process, allowing us to better understand our guests' needs and preferences. What truly sets it apart is the exceptional customer support - the team behind this product is always responsive and dedicated to ensuring our success. With this tool by our side, we're equipped to elevate the guest experience and drive our business forward.",
  },
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/4.jpg" />,
    name: 'Julia Stewart',
    occupation: 'Restaurant Owner',
    testimonial:
    "As a hotel/restaurant owner, attention to detail is paramount in providing exceptional guest experiences. I deeply appreciate the meticulous design of this product. It's the small touches that truly elevate the guest experience, and it's evident that the creators have prioritized delivering a premium solution. With this level of craftsmanship, I am confident that our establishment can offer nothing short of excellence to our guests.",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/5.jpg" />,
    name: 'John Smith',
    occupation: 'Restaurant Owner',
    testimonial:
      "As a restaurant owner, I've explored various solutions, but this one truly surpasses the rest with its innovative features. It's evident that the creators meticulously crafted a solution that directly caters to the needs of hospitality businesses like mine.",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/6.jpg" />,
    name: 'Daniel Wolf',
    occupation: 'Hotel Owner',
    testimonial:
      "As a hotel/restaurant owner, attention to detail is paramount in creating memorable experiences for our guests. I appreciate the meticulous design of this product, as it reflects the same commitment to excellence that we strive for in our establishment. The thoughtful touches truly enhance the overall experience, and it's clear that the creators have prioritized delivering a premium solution.",
  },
];

const whiteLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const darkLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const logoStyle = {
  width: '64px',
  opacity: 0.3,
};

export default function Testimonials() {
  const theme = useTheme();
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Testimonials
        </Typography>
        <Typography variant="body1" color="text.secondary">
        Explore what our users appreciate most about our feedback analyzer. Learn how we excel in delivering actionable insights, user-friendly interfaces, and exceptional support. Join us for quality analytics, innovative solutions, and reliable assistance.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
                <img
                  src={logos[index]}
                  alt={`Logo ${index + 1}`}
                  style={logoStyle}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}