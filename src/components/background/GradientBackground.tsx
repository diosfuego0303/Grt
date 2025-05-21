import React, { useEffect, useRef } from 'react';
import { useFormContext } from '../../context/FormContext';

const GradientBackground: React.FC = () => {
  const { theme } = useFormContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create gradient colors based on theme
    const getGradient = () => {
      const colors = theme === 'light' 
        ? ['rgba(238, 242, 255, 0.8)', 'rgba(224, 231, 255, 0.6)', 'rgba(199, 210, 254, 0.4)']
        : ['rgba(15, 23, 42, 0.8)', 'rgba(15, 23, 42, 0.6)', 'rgba(15, 23, 42, 0.4)'];
        
      return colors;
    };
    
    // Gradient circles
    class GradientCircle {
      x: number;
      y: number;
      radius: number;
      color: string;
      dx: number;
      dy: number;
      
      constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = (Math.random() - 0.5) * 0.5;
        this.dy = (Math.random() - 0.5) * 0.5;
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        
        // Create gradient
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      update() {
        if (!canvas) return;
        
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }
        
        this.x += this.dx;
        this.y += this.dy;
        
        this.draw();
      }
    }
    
    // Create gradient circles
    const circles: GradientCircle[] = [];
    const colors = getGradient();
    
    const createCircles = () => {
      circles.length = 0;
      
      for (let i = 0; i < 3; i++) {
        const radius = Math.random() * 400 + 200;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const color = colors[i % colors.length];
        
        circles.push(new GradientCircle(x, y, radius, color));
      }
    };
    
    createCircles();
    
    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw base background
      ctx.fillStyle = theme === 'light' ? 'rgb(249, 250, 251)' : 'rgb(3, 7, 18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw each circle
      circles.forEach(circle => circle.update());
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default GradientBackground;