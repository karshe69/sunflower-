import java.awt.BasicStroke;
import java.awt.Canvas;
import java.awt.Color;
import java.awt.Graphics;
import javax.swing.JFrame;
import java.awt.Graphics2D;
import java.lang.Math;
import java.sql.Time;
import java.util.concurrent.TimeUnit;


public class Drawing extends Canvas {
	static int num1 = 1000;
	static int num2 = 1000;
    public static void main(String[] args) {
        JFrame frame = new JFrame("My Drawing");
        Canvas canvas = new Drawing();
        frame.add(canvas);
        canvas.setSize(num1, num2);
        frame.pack();
        frame.setVisible(true);
        
    }

    public void paint(Graphics g) {
    	int size = 1;
    	double r = 0, gr = 85, b = 170, r1 = 1.5, g1 = 1.3333, b1 = 0.7;
    	int n1, n2;
    	double theta = 0;
    	int radius = 0;
    	double change = 0;
    	change = 0.1;
    	change *= (2 * Math.PI);
        Graphics2D g2 = (Graphics2D) g;
        g2.setStroke(new BasicStroke(5));

    	while(true) {
        	theta = 0;
        	radius = 0;
        	change += 0.00049465926;
        	r += r1;
        	gr += g1;
        	b += b1;
	    	g.setColor(new Color((int)r%255, (int)gr%255, (int)b%255));
	    	for(int i = 0; i < 10000; i++) {
	    		n1 = (int)(radius * Math.sin(theta) + num1/2);
	    		n2 = (int)(radius * Math.cos(theta) + num2/2);
	    		g.drawLine(n1, n2, n1, n2);
	    		radius += size;
	    		theta += change;
	    	}
	    	
			
	    	g.setColor(new Color(255, 255, 255));
	    	//g.fillRect(0, 0, num1, num2);
	    }
    }
   
}